import Styles from './hlsPlayer.module.css';
import Head from 'next/head'
import Router from 'next/router';
import validateServerAccess from '../lib/validateServerAccess';
import Hls from "hls.js";
import cheomecastHandler from '../lib/chromecastHandler';
import Resolution from '../lib/resolution';
import { Component } from 'react';


export default class HlsPlayer extends Component {
    static async getInitialProps ({ query }) {
        const id = query.id
    
        return {
          show_id: id
        }
      }
    
    constructor(props) {
        super(props);
        this.show_id = this.props.show_id;
        this.server = this.props.server;
        this.id = this.props.id;
        this.type = this.props.type;
        this.hls = undefined;
        this.group = undefined; // group id from manifest
        this.notifyAt = this.props.notifyAt // When we have this time left in the video, we will notify the caller
        this.notify = this.props.notify; // Function to call when we have reached the notifyAt time
        this.notified = false // True if we have notified the caller
        this.timeUpdate = this.props.timeUpdate; // Function to call when the time is updated

        this.state = {
            videoPaused: false,
            title: this.props.title,
            infoText: this.props.infoText,
            subtitles: [], // For HLS
            directplaySubtitles: [], // For directplay
            resolutions: [],
            audioLanguages: [],
            activeLanguageStreamIndex: null, // -1 = Not selected yet
            activeResolutionLevel: 0, // The index of the active resolution, 0 == highest, i.e state.resolutions[0]
            activeSubtitleId: -1, // -1 = no subtitle selected
            usingDirectplay: false,
            importGCastAPI: false,
            nativeHlsSupported: false,
            controlsVisible: true,
            timeAtResolutionChange: 0,
            volume: 1,
            oldVolume: 1,
            muted: false,
            previewImages: [],
        }

        this.updateCurrentTimeInterval = undefined;
        this.pingInterval = undefined;


        /* SEEK */
        this.seeking = false; // Flag for seeking
        this.fullscreen = false; // Flag for fullscreen
        this.chromecastSeekValue = 0;
        this.chromecastDuration = 0;

        /* REFS */
        this.seekBar = undefined;
        this.seekBarLabel = undefined;
        this.seekBarPreview = undefined;
        this.videoNode = undefined;
        this.subtitleNode = undefined;
        this.videoContainer = undefined;

        /* BINDINGS */
        this.onVideoTimeUpdate = this.onVideoTimeUpdate.bind(this);
        this.toggleFullscreen = this.toggleFullscreen.bind(this);
        this.updateSeekTime = this.updateSeekTime.bind(this);
        this.startSeek = this.startSeek.bind(this);
        this.onPause = this.onPause.bind(this);
        this.onPlay = this.onPlay.bind(this);
        this.toggleMute = this.toggleMute.bind(this);
        this.ping = this.ping.bind(this);
        this.seek = this.seek.bind(this);
        this.togglePlay = this.togglePlay.bind(this);
        this.updateVolume = this.updateVolume.bind(this);
        this.onManifestParsed = this.onManifestParsed.bind(this);
        this.onManifestLoaded = this.onManifestLoaded.bind(this);
        this.chromecastDisconnect = this.chromecastDisconnect.bind(this);
        this.updateVideoProgress = this.updateVideoProgress.bind(this);
        this.chromecastProgressUpdate = this.chromecastProgressUpdate.bind(this);
        this.showControls = this.showControls.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);


        let runningOnClient = typeof window !== "undefined";
        if (runningOnClient) {
            this.chromecastHandler = new cheomecastHandler(this.chromecastProgressUpdate, this.chromecastDisconnect);
        }

        this.getSubtitles();
        this.getLanguages()
            .then(() => {
                this.getResolutions().then(resolutions => {
                    const directplay = resolutions[0].name === "Directplay";
                    this.setState({
                        resolutions: resolutions,
                        activeResolutionLevel: resolutions.length - 1,
                        usingDirectplay: directplay
                    }, () => {
                        console.log(directplay)
                        console.log(resolutions)
                        this.getSrc(directplay).then(src => {
                            this.chromecastHandler.setSrc(src); // TODO: Test
                            if (this._ismounted) {
                                this.setupHls();
                            }
                        })
                    });

                });
            });
    }

    /**
     * Get all the available resolutions for the video
     * 
     * @returns {Promise<Array>}
     */
    getResolutions() {
        return new Promise(resolve => {
            validateServerAccess(this.server, (serverToken) => {
                fetch(`${this.server.server_ip}/api/video/${this.id}/getResolution?type=${this.type}&token=${serverToken}`).then(res => {
                    res.json().then(data => {
                        const resolutions = data.resolutions.reverse();
                        const directplay = data.directplay;
                        const returnData = [];
                        if (directplay) {
                            returnData.push(new Resolution(resolutions.length, "Directplay"));
                        }
                        for (let i = resolutions.length - 1; i >= 0; i--) {
                            returnData.push(new Resolution(i, resolutions[i]));
                        }

                        resolve(returnData);
                    });
                })
            });
        });
    }

    /**
     * Return true if the device natively supports hls
     * 
     * @returns {Boolean}
     */
    supportsHls() {
        const ua = navigator.userAgent;
        const isIos = (/iPad|iPhone|iPod/.test(ua)) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        return Boolean(this.videoNode.canPlayType('application/vnd.apple.mpegurl') || this.videoNode.canPlayType('audio/mpegurl')) && isIos;
    }

    /**
     * Called when chromecast progress is updated
     * 
     * @param {number} currentTime - The current time of the video 
     * @param {number} duration - The duration of the video
     */
    chromecastProgressUpdate(currentTime, duration) {
        this.updateSeekTime(currentTime, duration);
        this.notifyParentIfNeeded(currentTime, duration);

    }

    /**
     * Get the source url for the video
     * 
     * @returns The src for the video
     */
    getSrc(directplay) {
        return new Promise(resolve => {
            validateServerAccess(this.server, (serverToken) => {
                let src;
                if (directplay) {
                    src = `${this.server.server_ip}/api/video/${this.id}/directplay?type=${this.type}&token=${serverToken}`;
                } else {
                    if (this.state.activeLanguageStreamIndex == null) {
                        console.log(`[HLS] WARNING: Calling getSrc() when activelanguageStreamIndex is null`);
                        src = `${this.server.server_ip}/api/video/${this.id}/hls/master?audioStream=0&type=${this.type}&token=${serverToken}`;
                    } else {
                        src = `${this.server.server_ip}/api/video/${this.id}/hls/master?audioStream=${this.state.activeLanguageStreamIndex}&type=${this.type}&token=${serverToken}`;
                    }
                }
                resolve(src);
            });
        });
    }

    /**
     * Get preview images
     * 
     * @returns an array of base64 encoded images
     */
     getPreviewImages() {
        return new Promise(resolve => {
            validateServerAccess(this.server, (serverToken) => {
                console.log(`${this.server.server_ip}/api/previewImage/${this.id}/all?type=${this.type}&token=${serverToken}`)
                fetch(`${this.server.server_ip}/api/previewImage/${this.id}/all?type=${this.type}&token=${serverToken}`).then(res => {
                    res.json().then(data => {
                        console.log(data)
                        resolve(data);
                    });
                })
            });
        });
    }

    /**
     * Change the source to the video with the given id
     */
    setSrc(id) {
        clearInterval(this.updateCurrentTimeInterval);
        this.id = id;
        this.notified = false;
        this.getSubtitles();

        this.getLanguages().then(() => {
            this.getResolutions().then(resolutions => {
                const directplay = resolutions[0].name === "Directplay";
                this.setState({
                    resolutions: resolutions,
                    activeResolutionLevel: resolutions.length - 1,
                    usingDirectplay: directplay
                }, () => {
                    this.getSrc(directplay).then(src => {
                        this.chromecastHandler.setSrc(src); // TODO: test
                        this.chromecastHandler.setInitialSeek(0);

                        if (this.state.nativeHlsSupported) {
                            this.videoNode.src = src;
                        } else if (directplay) {
                            this.videoNode.src = src;
                            this.videoNode.currentTime = 0;
                        } else {
                            this.hls.loadSource(src);
                            this.hls.attachMedia(this.videoNode);
                            this.videoNode.src = src;
                        }
                        if (this.chromecastHandler.isCasting()) {
                            this.chromecastHandler.reloadSource();
                        } else {
                            this.videoNode.play();
                        }
                    })
                });

            });
        });
    }


    /**
     * Get the video languages from the server
     */
    getLanguages() {
        return new Promise(resolve => {
            validateServerAccess(this.server, (serverToken) => {
                fetch(`${this.server.server_ip}/api/video/${this.id}/getLanguages?type=${this.type}&token=${serverToken}`)
                    .then(response => response.json())
                    .then(data => {
                        const defaultLanguage = this.getDefaultLanguage(data);
                        this.setState({
                            audioLanguages: data,
                            activeLanguageStreamIndex: defaultLanguage != null ? defaultLanguage.stream_index : 0
                        }, () => {
                            resolve();
                        });
                    });
            });
        });

    }

    /**
     * Get the default language from the languages
     * 
     * @param {Array} languages - The languages from the server 
     * @returns 
     */
    getDefaultLanguage(languages) {
        // TODO: Default language should be a user preference
        for (let i = 0; i < languages.length; i++) {
            if (languages[i].longName === "English") {
                return languages[i];
            }
        }
        if (languages.length > 0) {
            console.log(`[HLS] Couldn't find a default language. Using first from stream`);
            return languages[0];
        } else {
            console.log(`[HLS] Couldn't find any language for the video. This will probably lead to the video not playig`);
            return null;
        }
    }


    /**
     * Get the group id from the manifest
     * 
     * @param {Object} data 
     * @returns The group id from the manifest
     */
    getGroupIdFromManifest(data) {
        if (data.levels.length > 0 && data.levels[0].url.length > 0) {
            const regex = /group=([^&]+)/i;
            try {
                return data.levels[0].url[0].match(regex)[1];
            } catch (e) {
                console.log("[HLS] No group id found in manifest (regex error comming line after this). This will leed to faster aborts of transcodings");
                console.log(e);
            }
        } else {
            console.log("[HLS] No group id found in manifest. This will leed to faster aborts of transcodings");
        }
    }


    /**
     * Setup various listeners
     */
    setupListeners() {
        this.videoNode.ontimeupdate = this.onVideoTimeUpdate;
        this.videoNode.onpause = this.onPause;
        this.videoNode.onplay = this.onPlay;
        if (!this.state.nativeHlsSupported) {
            this.hls.on(Hls.Events.MANIFEST_PARSED, this.onManifestParsed);
            this.hls.on(Hls.Events.MANIFEST_LOADED, this.onManifestLoaded);
            this.soundBar.oninput = this.updateVolume;
        }

        document.addEventListener("keydown", this.handleKeyPress);
    }

    /**
     * Called when the HLS manifest is parsed
     * 
     * @param {*} event 
     * @param {*} data 
     */
    onManifestParsed(event, data) {
        this.group = this.getGroupIdFromManifest(data);
        this.hls.nextLevel = this.state.activeResolutionLevel;
        this.videoNode.currentTime = this.state.timeAtResolutionChange;

        // Resume playing if user switched to transcoding
        if (this.state.timeAtResolutionChange > 0) {
            this.videoNode.play();
        }
    }

    /**
     * Called when the HLS manifest is loaded, save the subtitle tracks
     * @param {*} event 
     * @param {*} data 
     */
    onManifestLoaded(event, data) {
        const subs = data.subtitles;

        for (let i = 0; i < subs.length; i++) {
            const id = this.getSubtitleIdFromHlsUrl(subs[i].url);
            console.log(`[HLS] Subtitle track ${i}: server id: ${id}`);
            subs[i].serverId = id;
        }

        if (data.subtitles.length > 0) {
            subs.push({
                id: -1,
                name: "Off",
                serverId: -1,
            });
        }
        this.setState({
            subtitles: data.subtitles
        });

        // Set the correct subtitle track
        if (this.state.activeSubtitleId !== -1) {
            // Get the server id from the active subtitle
            const directplaySubtitle = this.state.directplaySubtitles.find(s => s.id === this.state.activeSubtitleId);
            if (directplaySubtitle) {
                // Get the subtitle from the directplay subtitles
                const subtitle = data.subtitles.find(s => s.serverId === directplaySubtitle.id);
                console.log("found");
                console.log(subtitle);
                this.setSubtitle(subtitle);
            }
        }
    }

    /**
     * Get the subtitle server id from the HLS url
     * 
     * @param {string} url - The url of the subtitle track
     * @returns {string} - The server id of the subtitle track
     */
    getSubtitleIdFromHlsUrl(url) {
        const regex = /subtitles\/(\d+)/i;
        try {
            return url.match(regex)[1];
        } catch (e) {
            console.log("[HLS] No subtitle id found in HLS URL. Can't autoswitch subtitles between directplay and transcoding");
            console.log(e);
            return -2; // -2 is a special value that means that we can't autoswitch subtitles
        }
    }

    /**
     * Get the list of subtitles (used for directplay)
     */
    getSubtitles() {
        validateServerAccess(this.server, (serverToken) => {
            fetch(`${this.server.server_ip}/api/subtitles/list?type=${this.type}&content=${this.id}&token=${serverToken}`).then(res => {
                res.json().then(data => {
                    this.setState({
                        directplaySubtitles: data.subtitles
                    });
                    console.log(data);
                });
            })
        });
    }

    /**
     * Set the volume of the video based on the volume bar value
     */
    updateVolume() {
        this.state.volume = this.soundBar.value / 100;
        if (this.chromecastHandler.isCasting()) {
            this.chromecastHandler.setVolume(this.state.volume);
        } else {
            this.videoNode.volume = this.state.volume;
        }
        
        console.log("Volume", this.state.volume);
        if(this.state.volume <= 0.1) {
            this.setState({muted: true});
        } else {
            this.setState({muted: false});
        }
    }

    /**
     * Set volume when using the keyboard
     * @param {number} amount - the value to increase or decrease the volume by 
     */
    setVolume(amount) {
        this.state.volume += amount / 100;
        if (this.state.volume <= 0) {
            this.state.volume = 0;
            this.setState({muted: true});
        } else if (this.state.volume > 1) {
            this.state.volume = 1;
            this.setState({muted: false});
        } else {
            this.setState({muted: false});
        }

        this.soundBar.value = this.state.volume * 100;
        if (this.chromecastHandler.isCasting()) {
            this.chromecastHandler.setVolume(this.state.volume);
        } else {
            this.videoNode.volume = this.state.volume;
        }
    }

    /**
     * toggles mute and remembers the old volume
     */
    toggleMute() {
        if (this.state.volume > 0) {
            this.state.oldVolume = this.state.volume;
            this.state.volume = 0;
            this.soundBar.value = 0;
            this.setState({muted: true});
        } else {
            this.state.volume = this.state.oldVolume;
            this.soundBar.value = this.state.volume * 100;
            this.setState({muted: false});
        }

        if (this.chromecastHandler.isCasting()) {
            this.chromecastHandler.setVolume(this.state.volume);
        } else {
            this.videoNode.volume = this.state.volume;
        }
    }

    /**
     * Set the title of the video
     * 
     * @param {string} title - The title of the video 
     */
    setTitle(title) {
        this.setState({ title: title })
    }

    /**
     * Set the info text of the video
     * 
     * @param {string} text - The text to display
     */
    setInfoText(text) {
        this.setState({ infoText: text });
    }

    /**
     * Called when the video plays
     */
    onPlay() {
        this.setState({ videoPaused: false });
    }

    /**
     * Called when the video pauses
     */
    onPause() {
        this.setState({ videoPaused: true });
    }

    /**
     * Toggle the video play state
     */
    togglePlay() {
        clearInterval(this.updateCurrentTimeInterval);

        if (this.chromecastHandler.isCasting()) {
            if (this.chromecastHandler.isPaused()) {
                this.updateCurrentTimeInterval = setInterval(this.updateVideoProgress, 5000);
            }
            this.chromecastHandler.togglePlay();
        } else {
            if (this.videoNode.paused) {
                this.videoNode.play();
                this.updateCurrentTimeInterval = setInterval(this.updateVideoProgress, 5000);
            } else {
                this.videoNode.pause();
            }
        }
    }

    /**
     * Shows the video at a given time
     * 
     * @param {number} startTime - The time in seconds to start the video at 
     */
    show(startTime = 0) {
        this.videoContainer.style.display = 'block';
        this.videoNode.currentTime = startTime;
        this.togglePlay();
    }

    chromecastRequestTitle(source) {
        console.log(`Sending ${this.state.title} as title to Chromecast`);
        console.log(source);
        return this.state.title;
    }

    /**
     * Setup the video player and listeners
     */
    setupHls() {
        const usingDirectplay = this.state.usingDirectplay;
        const nativeHlsSupported = this.supportsHls();
        this.setState({ nativeHlsSupported: nativeHlsSupported }, () => {
            // This needs to be in a callback because setupListeners uses this state
            const useDebug = localStorage.getItem("HLS_DEBUG") === "true";
            this.getSrc(usingDirectplay)
                .then(src => {
                    if (nativeHlsSupported) {
                        this.videoNode.src = src;
                    } else if (usingDirectplay) {
                        this.videoNode.src = src;
                        this.hls = new Hls({ maxMaxBufferLength: 60, debug: useDebug });
                        this.videoNode.volume = 1;
                        this.videoNode.currentTime = this.state.timeAtResolutionChange;

                        // Play if changing quality to directplay
                        if (this.state.timeAtResolutionChange > 0) {
                            this.videoNode.play();
                        }

                        // Set the correct subtitle track
                        if (this.state.activeSubtitleId !== -1) {
                            // Get the server id from the active subtitle
                            const subtitle = this.state.subtitles.find(s => s.id === this.state.activeSubtitleId);
                            if (subtitle) {
                                // Get the subtitle from the directplay subtitles
                                const directplaySubtitle = this.state.directplaySubtitles.find(s => s.id === subtitle.serverId);
                                this.setSubtitle(directplaySubtitle);
                            }
                        }
                    } else {
                        this.hls = new Hls({ maxMaxBufferLength: 60, debug: useDebug });
                        this.hls.loadSource(src);
                        this.hls.attachMedia(this.videoNode);
                        this.videoNode.volume = 1;
                    }
                    this.setupListeners();
                });


        });
    }

    /**
     * Switch from directplay to HLS transcoding
     */
    switchToHls() {
        this.setState({ usingDirectplay: false }, () => {
            this.setupHls();
        });
    }

    /**
     * Switch from HLS transcoding to directplay
     */
    switchToDirectplay() {
        this.hls.destroy();
        this.setState({ usingDirectplay: true }, () => {
            this.setupHls();
        });
    }

    /**
     * Stop the video and unsubscripe/remove listeners and clear intervals
     */
    unsubscribeFromAllEvents() {
        if (this._ismounted) {
            this.videoNode.pause();
            this.videoNode.removeAttribute("src");
            if (!this.state.nativeHlsSupported) {
                this.hls.destroy();
            }
            clearInterval(this.updateCurrentTimeInterval);
            clearInterval(this.pingInterval);
            clearTimeout(this.hideControlsTimeout);
            if (this.chromecastHandler.isCasting()) {
                this.chromecastHandler.stopCast();
            }
            this.stopTranscoding();
            
            document.removeEventListener("keydown", this.handleKeyPress);

            console.log(`[HLS] Unsubscribing from all events`);
        }
    }

    componentDidMount() {
        // Check the localStorage if the chromecast API has already been loaded, if not, load it
        let runningOnClient = typeof window !== "undefined";
        if (runningOnClient && window["gCastIncluded"] == null) {
            this.setState({ importGCastAPI: true });
            window["gCastIncluded"] = true;
        }

        // When the user goes back, we need to unsubscribe from all events
        Router.beforePopState(({ url, as, options }) => {
            this.unsubscribeFromAllEvents();
            return true;
        });

        this._ismounted = true;
        // If we have found the language, we can setup HLS. If not we will wait for the language to be found
        if (Hls.isSupported() && this.state.activeLanguageStreamIndex !== null) {
            this.setupHls();
        }
        this.soundBar.value = 100;
        this.seekBar.value = 0;
        this.pingInterval = setInterval(this.ping, 5000);
        
        this.getPreviewImages().then((image_array) => {
            this.setState({
                previewImages: image_array
            });
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAllEvents();
        this._ismounted = false;
    }

    /**
     * Ping the server that we are still active
     */
    ping() {
        console.log("Trying to ping")
        console.log(`group: ${this.group}, usingDirectplay: ${this.state.usingDirectplay}`);
        validateServerAccess(this.server, (serverToken) => {
            if (this.group != undefined && !this.state.usingDirectplay) {
                fetch(`${this.server.server_ip}/api/video/${this.id}/hls/ping?group=${this.group}&serverToken=${serverToken}`);
            }
        });
    }

    /**
     * Tell the server that we don't need the video anymore
     */
    stopTranscoding() {
        validateServerAccess(this.server, (serverToken) => {
            if (this.group != undefined) {
                fetch(`${this.server.server_ip}/api/video/${this.id}/hls/stop?group=${this.group}&serverToken=${serverToken}`);
            }
        });
    }

    /**
     * Update the seekbar to the current video time
     * 
     * @param {number} currentTime - The current time of the video
     * @param {number} duration - The duration of the video
     */
    updateSeekTime(currentTime = this.videoNode.currentTime, duration = this.videoNode.duration) {
        if (this.chromecastHandler.isCasting() && currentTime != 0) {
            this.chromecastSeekValue = currentTime;
            this.chromecastDuration = duration;
        }
        const newValue = this.seekBar.value;
        const newPosition = 10 - (newValue * 0.2);
        const percentage = (currentTime / duration) * 100;

        const scrubbed = this.seekBar.value / 100 * duration;

        let seconds = Math.floor(scrubbed % 60);
        let minutes = Math.floor(scrubbed / 60 % 60);
        let hours = Math.floor(scrubbed / 3600);

        seconds = seconds >= 10 ? seconds : `0${seconds}`;
        minutes = minutes >= 10 ? minutes : `0${minutes}`;
        const showHours = hours > 0;

        let time = "";
        if (showHours) {
            time = hours !== 0 ? hours + ':' : '';
        }
        time += minutes + ':' + seconds;
        
        if (!isNaN(scrubbed)) {
            this.seekBarLabel.innerHTML = `<span>${time}</span>`;
            this.seekBarLabel.style.left = `calc(${newValue}% + (${newPosition}px))`;
            if(this.state.previewImages.length != 0) {
                this.seekBarPreview.innerHTML = `<img src=${"data:image/png;base64," + (this.state.previewImages[Math.floor(scrubbed / 10)] == undefined ? "/9j/4AAQSkZJRgABAgAAAQABAAD//gAQTGF2YzU4LjU0LjEwMAD/2wBDAAgEBAQEBAUFBQUFBQYGBgYGBgYGBgYGBgYHBwcICAgHBwcGBgcHCAgICAkJCQgICAgJCQoKCgwMCwsODg4RERT/xABLAAEBAAAAAAAAAAAAAAAAAAAABwEBAAAAAAAAAAAAAAAAAAAAABABAAAAAAAAAAAAAAAAAAAAABEBAAAAAAAAAAAAAAAAAAAAAP/AABEIAJABAAMBIgACEQADEQD/2gAMAwEAAhEDEQA/AIeAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/2Q==" : this.state.previewImages[Math.floor(scrubbed / 10)])}></img>`
                this.seekBarPreview.style.left = `calc(${newValue}% - (${65}px))`;
            }
        }
        if (!this.seeking && !isNaN(percentage)) {
            this.seekBar.value = percentage;
        }
    }

    /**
     * Starts the seek (disabled the automatic update of the seekbar)
     */
    startSeek() {
        this.seeking = true;
        if(this.state.previewImages.length != 0) {
            this.seekBarPreview.style.display = "block";
        }
    }

    /**
     * Seek to a position based on the seek bar value
     */
    seek() {
        const seekSeconds = this.seekBar.value / 100 * this.videoNode.duration;
        if (this.chromecastHandler.isCasting()) {
            this.chromecastHandler.seek(seekSeconds);
        } else {
            this.videoNode.currentTime = seekSeconds
            this.updateVideoProgress();
        }
        this.seeking = false;
        this.seekBarPreview.style.display = "none";
    }

    /**
     * Skips forward/backward in the video
     */
    skip(seconds) {
        this.videoNode.currentTime += seconds;
    }

    /**
     * Get the current time of the video
     * 
     * @returns {string} The current time of the video
     */
    getCurrentTime() {
        console.log(this.videoNode.currentTime)
        if (this.chromecastHandler.isCasting()) {
            return this.chromecastSeekValue;
        } else {
            return this.videoNode.currentTime;
        }
    }

    /**
     * Get the duration of the video
     * 
     * @returns {string} The duration of the video
     */
    getVideoDuration() {
        if (this.chromecastHandler.isCasting()) {
            return this.chromecastDuration;
        } else {
            return this.videoNode.duration;
        }
    }

    /**
     * Update the current time to the server
     */
    updateVideoProgress() {
        validateServerAccess(this.server, (serverToken) => {
            const currentTime = this.getCurrentTime();
            const videoDuration = this.getVideoDuration();
            if (!isNaN(currentTime) && !isNaN(videoDuration)) {
                fetch(`${this.server.server_ip}/api/video/${this.id}/currenttime/set?type=${this.type}&time=${currentTime}&videoDuration=${videoDuration}&token=${serverToken}&group=${this.group}`);
            }
        });
    }

    /**
     * Called when the video time updates
     * Note: Not called when chromecast is active
     */
    onVideoTimeUpdate() {
        if (!this.seeking && this._ismounted) {
            if (!this.chromecastHandler.isCasting() && !this.state.nativeHlsSupported) {
                this.updateSeekTime();
            }
            this.notifyParentIfNeeded(this.videoNode.currentTime, this.videoNode.duration);
        }
    }

    /**
     * Called from both the video and chromecast player when the progress updates
     * Sends video time updates to the parent component
     * Sends a notification to the parent component when the video is less than the notification time
     * 
     * @param {number} currentTime - The current time of the video 
     * @param {number} duration - The duration of the video 
     */
    notifyParentIfNeeded(currentTime, duration) {
        if (this.timeUpdate != undefined) {
            this.timeUpdate(currentTime, duration); // Call the parent function
        }
        if (this.notifyAt != undefined &&
            duration - currentTime <= this.notifyAt &&
            !this.notified) {
            this.notified = true;
            this.notify();
        }
    }


    /**
     * Toggle fullscreen mode
     */
    toggleFullscreen() {
        console.log("Toggling fullscreesssssn")
        try {
            if (!this.fullscreen) {
                if (this.videoNode.requestFullscreen) {
                    this.videoContainer.requestFullscreen();
                } else if (this.videoNode.mozRequestFullScreen) { /* Firefox */
                    this.videoContainer.mozRequestFullScreen();
                } else if (this.videoNode.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
                    this.videoContainer.webkitRequestFullscreen();
                } else if (this.videoNode.msRequestFullscreen) { /* IE/Edge */
                    this.videoContainer.msRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) { /* Firefox */
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) { /* IE/Edge */
                    document.msExitFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        } catch (e) {
            console.log(e)
        }
    }

    /**
     * Change subtitle track
     * 
     * @param {object} subtitle - The subtitle object
     */
    setSubtitle(subtitle) {
        console.log(`[HLS] Change subtitle to ${subtitle.name} (id: ${subtitle.id}) for ${this.state.usingDirectplay ? 'directplay' : 'hls'}`);
        if (this.chromecastHandler.isCasting() && subtitle.id != -1) {
            this.chromecastHandler.setSubtitle(subtitle.name);
        } else if (this.state.usingDirectplay) {
            validateServerAccess(this.server, (serverToken) => {
                this.subtitleNode.src = `${this.server.server_ip}/api/subtitles/get?type=${this.type}&id=${subtitle.id}&token=${serverToken}`;
                console.log(this.videoNode.textTracks);
                console.log(this.subtitleNode);
                this.videoNode.textTracks[0].mode = 'showing';
            });
        } else {
            this.hls.subtitleTrack = subtitle.id;
        }
        this.setState({ activeSubtitleId: subtitle.id });
    }

    /**
     * Change resolution
     * 
     * @param {Resolution} resolution - The selected resolution
     */
    setResolution(resolution) {
        this.setState({ activeResolutionLevel: resolution.level, timeAtResolutionChange: this.videoNode.currentTime }, () => {
            console.log(`[HLS] Change resolution to ${resolution.name} (level: ${resolution.level})`);
            if (this.chromecastHandler.isCasting()) {
                this.chromecastHandler.setResolution(resolution);
            } else {
                if (this.state.usingDirectplay && resolution.name != "Directplay") {
                    this.videoNode.textTracks[0].mode = 'disabled';
                    this.switchToHls();
                    this.hls.nextLevel = resolution.level;
                } else if (!this.state.usingDirectplay && resolution.name == "Directplay") {
                    this.switchToDirectplay();
                } else {
                    this.hls.nextLevel = resolution.level;
                }

            }
        });
    }

    /**
     * Called when the chromecast disconnects
     */
    chromecastDisconnect() {
        clearInterval(this.updateCurrentTimeInterval);
        if (this._ismounted) {
            this.videoNode.currentTime = this.chromecastSeekValue;
            this.togglePlay();
        }
    }

    /**
     * Show the video controls
     */
    showControls() {
        this.setState({ controlsVisible: true });
        this.videoContainer.style.cursor = 'default';

        if (this.hideControlsTimeout != undefined) {
            clearTimeout(this.hideControlsTimeout);
        }
        this.hideControlsTimeout = setTimeout(() => {
            this.setState({ controlsVisible: false });
            this.videoContainer.style.cursor = 'none';
        }, 5000000000000000000);

    }

    /**
     * Handle keypresses in the video container
     */
    handleKeyPress(event) {
        if(event.key === 'f'){
          this.toggleFullscreen();
        }

        if(event.key === ' ' || event.key === 'p'){
            this.togglePlay();
        }

        if(event.key === 'm'){
            this.toggleMute();
        }

        if(event.key === 'ArrowUp'){
            this.setVolume(10);
        }

        if(event.key === 'ArrowDown'){
            this.setVolume(-10);
        }

        if(event.key === 'ArrowRight'){
            this.skip(15);
        }

        if(event.key === 'ArrowLeft'){
            this.skip(-15);
        }
      }


    // TODO: Shouldn't include chromecast api from cdn, should be included in the main server and use import statement
    render() {
        return (
            <>
                <Head>
                    {this.state.importGCastAPI &&
                        <script src="//www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1" strategy="beforeInteractive"></script>
                    }
                </Head>
                <div onMouseMove={this.showControls} className={Styles.videoContainer} ref={node => this.videoContainer = node} onDoubleClick={this.toggleFullscreen}>
                    <video ref={node => this.videoNode = node} playsInline className={Styles.videoPlayer} onClick={!this.state.nativeHlsSupported ? this.togglePlay : null} controls={this.state.nativeHlsSupported} crossOrigin={"anonymous"}>
                        <track id="subtitle" ref={node => this.subtitleNode = node} kind="subtitles" />
                    </video>
                    {this.props.children}

                    {!this.state.nativeHlsSupported &&
                        <>
                            <div className={`${Styles.topControls} ${this.state.controlsVisible ? Styles.visible : ""}`}>
                                <div className={Styles.backImage} onClick={() => Router.back()}></div>
                            </div>


                            <div className={`${Styles.videoControls} ${this.state.controlsVisible ? Styles.visible : ""}`}>
                                <div className={Styles.seekWrapper}>
                                    <div className={Styles.seekBarPreview} ref={node => this.seekBarPreview = node}>

                                    </div>
                                
                                    <div className={Styles.seekTime} id="seekTime" ref={node => this.seekBarLabel = node}>
                                    
                                    </div>
                                    
                                    <input className={Styles.seekbar} type="range" id="seekbar" name="seekbar" ref={node => this.seekBar = node}
                                        min="0" max="100" step="0.01" className={Styles.seekbar} onMouseDown={this.startSeek} onMouseUp={this.seek} onInput={this.updateSeekTime} />
                                </div>

                                <div className={Styles.lowerControls}>
                                    <div className={Styles.lowerLeftControls}>
                                        {this.state.videoPaused &&
                                            <div className={`${Styles.playButton} ${Styles.playPause} ${Styles.button}`} onClick={this.togglePlay}></div>
                                        }
                                        {!this.state.videoPaused &&
                                            <div className={`${Styles.pauseButton} ${Styles.playPause} ${Styles.button}`} onClick={this.togglePlay}></div>
                                        }

                                        <div className={Styles.soundContainer}>
                                            {!this.state.muted &&
                                                <div className={`${Styles.soundImage} ${Styles.button}`} onClick={this.toggleMute}></div>
                                            }
                                            {this.state.muted &&
                                                <div className={`${Styles.mutedSoundImage} ${Styles.button}`} onClick={this.toggleMute}></div>
                                            }
                                            <div className={Styles.soundbarContainer}>
                                                <input className={Styles.soundbar} type="range" id="soundbar" name="soundbar" ref={node => this.soundBar = node} defaultValue={this.state.volume} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={Styles.lowerMiddleControls}>
                                        <h5 className={Styles.title}>{this.state.title}</h5>
                                        <h6 className={Styles.infoText}>{this.state.infoText}</h6>
                                    </div>
                                    <div className={Styles.lowerRightControls}>
                                        <div className={`${Styles.fullscreenImage} ${Styles.button}`} onClick={this.toggleFullscreen}></div>
                                        <div className={`${Styles.chromecast} ${Styles.button}`} onClick={() => this.chromecastHandler.requestChromecastSession(this.videoNode.currentTime)}>
                                            <google-cast-launcher></google-cast-launcher>
                                        </div>
                                        {(this.state.subtitles.length > 0 || this.state.directplaySubtitles.length > 0) &&
                                            <div className={Styles.subtitleContainer}>
                                                <div className={`${Styles.subtitles} ${Styles.button}`}></div>

                                                <div className={Styles.subtitlesList}>
                                                    <ul>
                                                        {!this.state.usingDirectplay && this.state.subtitles.map((subtitle, index) => {
                                                            return (
                                                                <li key={index} className={subtitle.id == this.state.activeSubtitleId ? `${Styles.activeSubtitle}` : ''} onClick={() => this.setSubtitle(subtitle)}>{subtitle.name}</li>
                                                            )
                                                        })}

                                                        {this.state.usingDirectplay && this.state.directplaySubtitles.map((subtitle, index) => {
                                                            return (
                                                                <li key={index} className={subtitle.id == this.state.activeSubtitleId ? `${Styles.activeSubtitle}` : ''} onClick={() => this.setSubtitle(subtitle)}>{subtitle.language}</li>
                                                            )
                                                        })}
                                                    </ul>
                                                </div>
                                            </div>
                                        }


                                        <div className={Styles.resolutionContainer}>
                                            <div className={`${Styles.resolutionImage} ${Styles.button}`}></div>

                                            <div className={Styles.resolutionList}>
                                                <ul>
                                                    {this.state.resolutions.map((resolution, index) => {
                                                        return (
                                                            <li key={index} className={resolution.level == this.state.activeResolutionLevel ? `${Styles.activeResolution}` : ''} onClick={() => this.setResolution(resolution)}>{resolution.name}</li>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </>
        );
    }
}
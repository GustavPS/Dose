import Styles from './videoComponent.module.css';
import Head from 'next/head'
import Router from 'next/router';
import validateServerAccess from '../lib/validateServerAccess';

export default class VideoComponent extends React.Component {
    constructor(props) {
        super(props);
        // Video element
        this.video = undefined;
        // Source element
        this.source = undefined;
        // Subtitle element
        this.subtitle = undefined;
        // Control timeout
        this.controlTimeout = undefined;
        // Update currenttime interval (for the server)
        this.updateCurrentTimeInterval = undefined;
        // Used for unique keys on elements.
        this.elementCounter = 0;
        // Function to call on time change events
        this.onTimeChange = props.onTimeChange;
        //this.getNextEpisodeID = props.getNextEpisodeID;

        this.onChangeEpisode = props.onChangeEpisode;

        this.server = props.server;
        this.serverToken = props.serverToken;
        this.type = props.Movie != undefined ? 'movie' : 'serie'
        this.internalID = props.internalID;

        this.state = {
            subtitles: {
                availableSubtitles: [],
                activeSubtitle: undefined
            },
            resolutions: {
                availableResolutions: [],
                activeResolution: ''
            },
            audioStreams: {
                availableStreams: [],
                activeStream: undefined
            },
            settings: {
                show: false,
                standardControl: false,
                audioControl: false,
                resolutionControl: false,
                subtitleControl: false
            },
            nextEpisode: this.type === 'serie' ? {
                timeLeft: null,
                internalID: null,
                season: null,
                episode: null,
                show: false,
                foundNextEpisode: false
            } : undefined,
            videoPaused: true,
            isBuffering: true,
            title: props.title,
            season: props.season,
            episode: props.episode,
            show: props.show
        }

        this.enterFullScreen      = this.enterFullScreen.bind(this);
        this.togglePlay           = this.togglePlay.bind(this);
        this.seek                 = this.seek.bind(this);
        this.startSeek            = this.startSeek.bind(this);
        this.toggleSettings       = this.toggleSettings.bind(this);
        this.updateSeekTime       = this.updateSeekTime.bind(this);
        this.pause                = this.pause.bind(this);
        this.play                 = this.play.bind(this);
        this.showResolutions      = this.showResolutions.bind(this);
        this.showAudioStreams     = this.showAudioStreams.bind(this);
        this.showSubtitles        = this.showSubtitles.bind(this);
        this.showStandardSettings = this.showStandardSettings.bind(this);
        this.changeVolume         = this.changeVolume.bind(this);
        this.showControls         = this.showControls.bind(this);
        this.setNextEpisodeID     = this.setNextEpisodeID.bind(this);
        this.playNextEpisode      = this.playNextEpisode.bind(this);
        this.getNextEpisodeID     = this.getNextEpisodeID.bind(this);
    }

    componentWillUnmount() {
        this.video.pause();
        clearInterval(this.updateCurrentTimeInterval);
        this.video.ontimeupdate = undefined;
    }

    componentDidMount() {
        this.video = document.getElementById('video');
        this.video.isFullscreen = false;

        // The duration of the movie
        this.video.realDuration = 999;
        // The watchtime offset for the seekbar (since we change source on seek and HTML do not know the correct watchtime after we change source)
        this.video.watchTimeOffset = 0;
        // True if we are currently seeking (Draging the seekbar);
        this.video.isSeeking = false;
        this.video.controls = false;
        this.video.pauseTime = undefined;


        this.source = document.createElement('source');
        this.video.appendChild(this.source);

        this.subtitle = document.getElementById('subtitle');

        this.loadSources();
        this.loadSubtitles();
        this.loadAudioStreams();

        if (this.type === 'serie') {
            this.getNextEpisodeID();
        }


        this.video.ontimeupdate = () => {
            if (!this.video.isSeeking) {
                let percentage = ((this.video.currentTime + this.video.watchTimeOffset) / this.video.realDuration) * 100;
                document.getElementById('seekbar').value = percentage
                this.updateSeekTime();
                
                if (this.type === 'serie' && this.video.getRealWatchtime() >= this.video.realDuration - 40 && this.state.nextEpisode.foundNextEpisode) {
                    this.displayNextEpisodeBox();
                }
            }
            if(this.state.isBuffering) {
                this.setState({isBuffering: false});
            }
        }

        // Returns the 'real' current time
        this.video.getRealWatchtime = () => {
            return this.video.watchTimeOffset + this.video.currentTime;
        }

        this.video.onpause = () => {
            this.video.pauseTime = new Date();
            this.setState({videoPaused: true});
        }
        this.video.onplay = () => {
            if (this.video.pauseTime != undefined) {
                let currentTime = new Date();
                let secondsSincePause = (currentTime.getTime() - this.video.pauseTime.getTime()) / 1000;
                // TODO: This value needs to be checked, not sure what is needed
                if (secondsSincePause > 15) {
                    this.video.pauseTime = undefined;
                    this.seek();
                }
            }
            this.setState({videoPaused: false, isBuffering: false});
        }
        // Show spinner on buffer
        this.video.onwaiting = () => {
            this.setState({isBuffering: true});
        };
    }

    updateServerToken(token, cb) {
        this.serverToken = token;
        cb();
    }

    show(time=0) {
        document.getElementById('videoContainer').style.display = 'block';
        this.togglePlay();
    }

    setNextEpisodeID(id, season, episode, foundNextEpisode) {
        console.log(`Found next episode: ${foundNextEpisode}, episodeID: ${id}`);
        let nextEpisode = this.state.nextEpisode;

        if (foundNextEpisode) {
            nextEpisode.internalID = id;
            nextEpisode.foundNextEpisode = true;
            nextEpisode.season = season;
            nextEpisode.episode = episode;
        } else {
            nextEpisode.foundNextEpisode = false;
        }
        this.setState({nextEpisode: nextEpisode});
    }

    getNextEpisodeID() {
        validateServerAccess(this.server, (serverToken) => {
            console.log("EP: " + this.state.episode)
            fetch(`${this.server.server_ip}/api/series/getNextEpisode?serie_id=${this.state.show}&season=${this.state.season}&episode=${this.state.episode}&token=${serverToken}`)
            .then(r => r.json())
            .then(result => {
                this.setNextEpisodeID(result.internalID, result.season, result.episode, result.foundEpisode);
            });
        });
    }

    displayNextEpisodeBox() {
        let nextEpisode = this.state.nextEpisode;
        let timeLeft = Math.floor(this.video.realDuration - this.video.getRealWatchtime());
        if (timeLeft === 0) {
            this.playNextEpisode();
        } else {
            nextEpisode.timeLeft = timeLeft;
            nextEpisode.show = true;
        }

        this.setState({nextEpisode: nextEpisode});
    }

    async playNextEpisode() {
        let nextEpisode = this.state.nextEpisode;
        this.internalID = this.state.nextEpisode.internalID;
        nextEpisode.timeLeft = null;
        nextEpisode.internalID = null;
        nextEpisode.show = false;
        nextEpisode.foundNextEpisode = false;
        this.video.watchTimeOffset = 0;

        await this.loadAudioStreams();
        this.loadSources(true).then(() => {
            this.loadSubtitles();
            if (this.onChangeEpisode != undefined) {
                this.onChangeEpisode(this.state.nextEpisode.season, this.state.nextEpisode.episode, this.internalID);
            }
        });
        this.setState({nextEpisode: nextEpisode});
        
    }

    loadSubtitles() {
        return new Promise(resolve => {
            validateServerAccess(this.server, (serverToken) => {
                fetch(`${this.server.server_ip}/api/subtitles/list?content=${this.internalID}&type=${this.type}&token=${serverToken}`)
                .then(r => r.json())
                .then(result => {
                    let noSub = {id: -1, language: 'None'};
                    let stateSubs = this.state.subtitles;
                    stateSubs.availableSubtitles = result.subtitles;
                    stateSubs.availableSubtitles.push(noSub);
    
                    // If a subtitle was already selected (on automatic change episode), try to find a subtitle with the same language and set that as active.
                    let found = false;
                    if (this.state.subtitles.activeSubtitle !== undefined) {
                        for (let subtitle of result.subtitles) {
                            if (this.state.subtitles.activeSubtitle.language === subtitle.language) {
                                found = true;
                                this.changeSubtitle(subtitle);
                                break;
                            }
                        }
                    }
    
                    
                    if (!found) {
                        this.changeSubtitle(noSub);
                    }
                    this.setState({subtitles: stateSubs});
                    resolve();
                })
                .catch(e => {
                    // TODO: Error handling
                    console.log(e);
                    resolve();
                })
            });
        });
    }

    loadAudioStreams() {
        return new Promise(resolve => {
            validateServerAccess(this.server, (serverToken) => {
                fetch(`${this.server.server_ip}/api/video/${this.internalID}/getLanguages?type=${this.type}&token=${serverToken}`)
                .then(r => r.json())
                .then(result => {
                    console.log(result);
                    let currentState = this.state.audioStreams;
                    currentState.availableStreams = result;

                    this.setState({audioStreams: currentState}, () => resolve());
                })
            });

        });
    }
    
    loadSources(autoplay = false) {
        return new Promise(resolve => {
            validateServerAccess(this.server, (serverToken) => {
            // Set the duration of the video
            fetch(`${this.server.server_ip}/api/video/${this.internalID}/getDuration?type=${this.type}&token=${serverToken}`)
            .then(r => r.json())
            .then(data => {
                this.video.realDuration = data.duration;
            });

            // Get the current time for this video
            fetch(`${this.server.server_ip}/api/video/${this.internalID}/currenttime/get?type=${this.type}&token=${serverToken}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(r => r.json())
            .then(time => {
                time = time.time;
                this.video.watchTimeOffset = time;

                // Get the available resolutions for this video
                fetch(`${this.server.server_ip}/api/video/${this.internalID}/getResolution?type=${this.type}&token=${serverToken}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(r => r.json())
                .then(result => {

                    // If we already have selected an audio stream, change to that one.
                    let audio = '';
                    let audioState = this.state.audioStreams;
                    if (this.state.audioStreams.activeStream !== undefined) {
                        for (let stream of this.state.audioStreams.availableStreams) {
                            if (this.state.audioStreams.activeStream.shortName === stream.shortName) {
                                audio = `&audio=${stream.stream_index}`;
                                audioState.activeStream = stream;
                                break;
                            }
                        }
                    }


                    // If we didn't find a match for the langauges, (maybe this video don't have that language): Set the activeAudioStream to undefined (which will give us default audio for the file)
                    if (audio === '') {
                        audioState.activeStream = undefined
                    }

                    // Change the available resolutions
                    let resolutions = this.state.resolutions;
                    resolutions.availableResolutions = result.resolutions;

                    if (result.directplay) {
                        this.source.setAttribute('src', `${this.server.server_ip}/api/video/${this.internalID}?type=${this.type}&token=${serverToken}&start=${time}&quality=directplay${audio}`)
                        resolutions.activeResolution = 'directplay';
                        resolutions.availableResolutions.push('directplay');
                    } else {
                        this.source.setAttribute('src', `${this.server.server_ip}/api/video/${this.internalID}?type=${this.type}&token=${serverToken}&start=${time}&quality=1080P${audio}`);
                        resolutions.activeResolution = '1080P';
                    }

                    // Save the new resolution state and audioState
                    this.setState({resolutions: resolutions, audioStreams: audioState});
    
    
                    this.video.load();
                    if (autoplay) {
                        this.video.play();
                    }
                    resolve();
                });
            })
            });
        });

    }

    getSettingElements() {
        let elements = [];

        // If we should display resulution controls
        if (this.state.settings.resolutionControl) {
            console.log(this.state.resolutions)
            for (let resolution of this.state.resolutions.availableResolutions) {
                elements.push(
                    <a href="#" key={this.elementCounter} className={resolution === this.state.resolutions.activeResolution ? Styles.active : ''} onClick={() => this.changeResolution(resolution)}>{resolution}</a>
                )
                this.elementCounter++;
            }


        // If we should display subtitle controls
        } else if (this.state.settings.subtitleControl) {
            for (let subtitle of this.state.subtitles.availableSubtitles) {
                elements.push(
                    <a href="#" key={this.elementCounter} className={this.state.subtitles.activeSubtitle != undefined && subtitle.id === this.state.subtitles.activeSubtitle.id ? Styles.active : ''} onClick={() => this.changeSubtitle(subtitle)}>{subtitle.language}</a>
                )
                this.elementCounter++;
            }

        // If we should display audio controls
        } else if (this.state.settings.audioControl) {
            for (let stream of this.state.audioStreams.availableStreams) {
                console.log(stream);
                elements.push(
                    <a href="#" key={this.elementCounter} className={this.state.audioStreams.activeStream != undefined && stream.id === this.state.audioStreams.activeStream.id ? Styles.active : ''} onClick={() => this.changeAudioStream(stream)}>{stream.longName}</a>
                );
                this.elementCounter++;
            }

        // If we should display standard controls
        } else {
            elements.push(
                <a href="#" key={this.elementCounter} onClick={this.showResolutions}>Quality</a>
            );
            this.elementCounter++;
            elements.push(
                <a href="#" key={this.elementCounter} onClick={this.showAudioStreams} >Audio</a>
            );
            this.elementCounter++;
            elements.push(
                <a href="#" key={this.elementCounter} onClick={this.showSubtitles}>Subtitles</a>
            );
            this.elementCounter++;
        }

        return elements;
    }

    changeResolution(resolution) {
        validateServerAccess(this.server, (serverToken) => {
            let audioSource = "";
            let activeStream = this.state.audioStreams.activeStream;
            if (activeStream != undefined) {
                audioSource = `&audio=${activeStream.stream_index}`;
            }

            this.source.setAttribute('src', `${this.server.server_ip}/api/video/${this.internalID}?type=${this.type}&token=${serverToken}&start=${this.video.getRealWatchtime()}&quality=${resolution}${audioSource}`);
            // Change the watchTimeOffset to proberly sync subtitles and seekbar.
            this.video.watchTimeOffset = this.video.getRealWatchtime();
            this.changeSubtitle(this.state.subtitles.activeSubtitle);
            this.video.load();
            this.video.play();
    
            // Change the active resolution in the state
            let resolutions = this.state.resolutions;
            resolutions.activeResolution = resolution;
            this.setState({resolutions: resolutions});
        });
    }

    changeSubtitle(subtitle) {
        let stateSubs = this.state.subtitles;
        if (subtitle == undefined) {
            return;
        }
        // Fix to prevent subs getting "stuck" when seeking
        this.video.textTracks[0].mode = 'hidden';

        if (subtitle.id === -1) {
            this.video.textTracks[0].mode = 'hidden';
            stateSubs.activeSubtitle = subtitle;
            this.setState({subtitles: stateSubs});
            return;
        }
        validateServerAccess(this.server, (serverToken) => {
            this.subtitle.setAttribute('src', `${this.server.server_ip}/api/subtitles/get?id=${subtitle.id}&type=${this.type}&start=${this.video.getRealWatchtime() - this.video.currentTime}&token=${serverToken}`);
            this.video.textTracks[0].mode = 'showing';
            stateSubs.activeSubtitle = subtitle;
            this.setState({subtitles: stateSubs});
        });

    }

    changeAudioStream(stream) {
        // If we changed to the same audio stream
        if (this.state.audioStreams.activeStream !== undefined && stream.id === this.state.audioStreams.activeStream.id) {
            return;
        }
        validateServerAccess(this.server, (serverToken) => {
            this.source.setAttribute('src', `${this.server.server_ip}/api/video/${this.internalID}?type=${this.type}&token=${serverToken}&start=${this.video.getRealWatchtime()}&quality=${this.state.resolutions.activeResolution}&audio=${stream.stream_index}`);
            this.video.watchTimeOffset = this.video.getRealWatchtime();
            this.changeSubtitle(this.state.subtitles.activeSubtitle);
            this.video.load();
            this.video.play();
    
            let streams = this.state.audioStreams;
            streams.activeStream = stream;
            this.setState({audioStreams: streams});
        });
    }

    enterFullScreen() {
        let videoContainer = document.getElementById('videoContainer');
        try {
            if (!this.video.isFullscreen) {
                if (this.video.requestFullscreen) {
                    videoContainer.requestFullscreen();
                } else if (this.video.mozRequestFullScreen) { /* Firefox */
                    videoContainer.mozRequestFullScreen();
                } else if (this.video.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
                    videoContainer.webkitRequestFullscreen();
                } else if (this.video.msRequestFullscreen) { /* IE/Edge */
                    videoContainer.msRequestFullscreen();
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
            this.video.isFullscreen = !this.video.isFullscreen;
        } catch(e) {

        }


    }

    togglePlay() {
        if (this.video.paused) {
            this.video.play();

            if (this.updateCurrentTimeInterval !== undefined) {
                clearInterval(this.updateCurrentTimeInterval);
            }
    
            this.updateCurrentTimeInterval = setInterval(() => {
                validateServerAccess(this.server, (serverToken) => {
                    fetch(`${this.server.server_ip}/api/video/${this.internalID}/currenttime/set?type=${this.type}&time=${this.video.getRealWatchtime()}&videoDuration=${this.video.realDuration}&token=${serverToken}`);
                });
            }, 5000);

        } else {
            clearInterval(this.updateCurrentTimeInterval);
            this.video.pause();
        }
    }

    seek(e) {
        let vidTime = document.getElementById('seekbar').value / 100 * this.video.realDuration;
        let quality = this.state.resolutions.activeResolution !== '' ? this.state.resolutions.activeResolution : '1080P';
        let audio = this.state.audioStreams.activeStream !== undefined ? `&audio=${this.state.audioStreams.activeStream.stream_index}` : ''

        validateServerAccess(this.server, (serverToken) => {
            this.source.setAttribute('src', `${this.server.server_ip}/api/video/${this.internalID}?type=${this.type}&token=${serverToken}&start=${vidTime}&quality=${quality}${audio}`);
            this.video.load();
            this.video.play();
            this.video.watchTimeOffset = vidTime;
            this.video.isSeeking = false;
    
            this.changeSubtitle(this.state.subtitles.activeSubtitle);
        });

    }

    startSeek() {
        this.video.isSeeking = true;
    }

    toggleSettings() {
        let settings = this.state.settings;
        settings.show = !settings.show;
        settings.resolutionControl = false;
        settings.audioControl      = false;
        settings.subtitleControl   = false;
        this.setState({settings: settings});
    }

    showResolutions() {
        let settings = this.state.settings;
        settings.resolutionControl = true;
        this.setState({settings: settings});
    }

    showSubtitles() {
        let settings = this.state.settings;
        settings.subtitleControl = true;
        this.setState({settings: settings});
    }

    showAudioStreams() {
        let settings = this.state.settings;
        settings.audioControl = true;
        this.setState({settings: settings});
    }

    showStandardSettings() {
        let settings = this.state.settings;
        settings.resolutionControl = false;
        settings.audioControl      = false;
        settings.subtitleControl   = false;
        this.setState({settings: settings});
    }

    updateSeekTime() {
        let range = document.getElementById('seekbar');
        let rangeV = document.getElementById('seekTime');
        let newValue = range.value;
        let newPosition = 10 - (newValue * 0.2);

        let seconds = Math.floor(range.value / 100 * this.video.realDuration);
        let minutes = Math.floor(seconds / 60);
        let hours   = Math.floor(minutes / 60);
        minutes = minutes % 60;
        seconds = seconds % 60;

        seconds = seconds >= 10 ? seconds : `0${seconds}`;
        minutes = minutes >= 10 ? minutes : `0${minutes}`;
        hours = hours >= 10 ? hours : `0${hours}`;

        let time = hours !== 0 ? hours + ':' : '';
        time += minutes + ':' + seconds;


        rangeV.innerHTML = `<span>${time}</span>`;
        rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;
    }

    play() {
        this.video.play();
    }
    pause() {
        this.video.pause();
    }

    getActiveSettingsName() {
        if (this.state.settings.subtitleControl) {
            return 'Subtitles';
        }
        if (this.state.settings.audioControl) {
            return 'Audio';
        }
        if (this.state.settings.resolutionControl) {
            return 'Quality';
        }
    }

    changeVolume(e) {
        this.video.volume = e.target.value / 100;
    }

    showControls() {
        document.getElementById('controls').classList.add(Styles.controlsActive);
        document.getElementById('overlay').classList.add(Styles.controlsActive);
        document.getElementById('transparentOverlay').classList.add(Styles.controlsActive);
        document.getElementById('videoContainer').style.cursor = 'auto';

        if (this.controlTimeout != undefined) {
            clearTimeout(this.controlTimeout);
        }

        this.controlTimeout = setTimeout(() => {
            document.getElementById('controls').classList.remove(Styles.controlsActive);
            document.getElementById('overlay').classList.remove(Styles.controlsActive);
            document.getElementById('transparentOverlay').classList.remove(Styles.controlsActive);
            document.getElementById('videoContainer').style.cursor = 'none';
        }, 5000);

    }

    setTitle(title) {
        this.setState({title: title});
    }

    setEpisode(episode, cb) {
        this.setState({episode: episode}, () => {
            cb();
        });
    }

    setSeason(season, cb) {
        this.setState({season: season}, () => {
            cb();
        });
    }

    render() {
        return (
            <>
            <Head>
                <script src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"></script>
                
            </Head>
            <div className={Styles.videoContainer} id="videoContainer" onMouseMove={this.showControls}>
            

                
                <video crossOrigin="anonymous" id="video" className={Styles.videoPlayer}>
                    <track id="subtitle" kind="subtitles" />
                </video>

                <div className={Styles.transparentOverlay} id="transparentOverlay" onClick={this.togglePlay} onDoubleClick={this.enterFullScreen}>

                </div>
                {this.state.isBuffering &&
                <div className={Styles.loadingOuter}>
                    <div class={Styles.loadingInner}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                }

                {this.state.nextEpisode != undefined && this.state.nextEpisode.show &&
                    <div className={Styles.nextEpisode}>
                        <h3>Nästa avsnitt spelas upp om <span id="timeToNextEpisode">{this.state.nextEpisode.timeLeft}</span> sekunder</h3>
                        <button id="playNextEpisode" onClick={this.playNextEpisode}>Starta nu</button>
                        <button id="cancelNextEpisode">Avbryt</button>
                    </div>
                }

                <div className={Styles.overlay} id="overlay">
                    <div className={Styles.back} onClick={() => Router.reload(window.location.pathname)}></div>
                    {this.type === 'serie' &&
                        <>
                            <h1>{this.state.title}</h1>
                            <p>Season {this.state.season} - Episode {this.state.episode}</p>
                        </>
                    }
                    {this.type === 'movie' &&
                        <h1>{this.state.title}</h1>
                    }
                </div>

                <div className={Styles.controller} id="controls">
                    {this.state.videoPaused &&
                        <div className={`${Styles.playButton} ${Styles.playPause}`} onClick={this.togglePlay}></div>
                    }
                    {!this.state.videoPaused && 
                        <div className={`${Styles.pauseButton} ${Styles.playPause}`} onClick={this.togglePlay}></div>
                    }
                    <div className={Styles.seekWrapper}>
                        <div className={Styles.seekTime} id="seekTime"></div>
                        <input type="range" id="seekbar" name="seekbar"
                        min="0" max="100" step="0.01" className={Styles.seekbar} onMouseDown={this.startSeek} onMouseUp={this.seek} onInput={this.updateSeekTime}/>
                    </div>

                    <div className={Styles.settingsBox}>
                        <div className={Styles.audioImage}></div>
                        <input className={Styles.volumeControl} type="range" id="volumeControl" name="volume"
                        min="0" max="100" step="0.01" onChange={this.changeVolume} />

                        <div onClick={this.toggleSettings} className={Styles.settingsButton}></div>
                        <div className={Styles.fullscreenImage} onClick={this.enterFullScreen}></div>

                        {this.state.settings.show &&
                            <div className={Styles.settings}>
                                <div className={Styles.settingsBack} onClick={this.showStandardSettings}><strong>{this.getActiveSettingsName()}</strong></div>
                                <hr style={{margin: 0}}/>
                                {this.getSettingElements()}
                            </div>
                        }
                    </div>

                </div>

            </div>
            </>
        )
    }
}
export default class ChromecastHandler {
    /**
     * Initializes the chromecast handler
     * 
     * @param {function} progressChanged - Called when the progress changes
     */
    constructor(src, progressChanged, disconnect) {
        this.src = src;
        this.remotePlayer;
        this.remotePlayerController;
        this.progressUpdateInterval;
        this.initialSeek = 0;
        this.progressChangedCallback = progressChanged;
        this.disconnect = disconnect;

        this.casting = false;
        const t = this;
        window['__onGCastApiAvailable'] = (isAvailable) => {
            console.log(`[HLS] gcastavailable: ${isAvailable}`);
            if (isAvailable) {
                t.initializeCastApi();
            }
        };
        console.log("[HLS] ChromecastHandler constructor")

        this.requestChromecastSessionSuccess = this.requestChromecastSessionSuccess.bind(this);
        this.requestChromecastSessionError = this.requestChromecastSessionError.bind(this);
        this.updateProgress = this.updateProgress.bind(this);
        this.mediaInfoChanged = this.mediaInfoChanged.bind(this);
        this.isConnectedChanged = this.isConnectedChanged.bind(this);
    }

    /**
     * Get current casting status
     * 
     * @returns {boolean} true if chromecast is connected and casting
     */
    isCasting() {
        return this.casting;
    }

    /**
     * Set the chromecast volume
     * 
     * @param {string} volume - The volume to set the chromecast to 
     */
    setVolume(volume) {
        if (!this.casting) {
            throw new Error("[HLS] ChromecastHandler not connected!");
        }
        this.remotePlayer.volumeLevel = volume;
        this.remotePlayerController.setVolumeLevel();
    }

    /**
     * Toggle the chromecast play/pause state
     */
    togglePlay() {
        if (!this.casting) {
            throw new Error("[HLS] ChromecastHandler not connected!");
        }
        this.remotePlayerController.playOrPause();
    }

    /**
     * Get current playing state of the chromecast player
     * 
     * @returns true if video is paused
     */
    isPaused() {
        if (!this.casting) {
            throw new Error("[HLS] ChromecastHandler not connected!");
        }
        return this.remotePlayer.isPaused;
    }

    /**
     * Seek to a specific time in the video
     * @param {string} seconds 
     */
    seek(seconds) {
        if (!this.casting) {
            throw new Error("[HLS] ChromecastHandler not connected!");
        }
        console.log(`[HLS] ChromecastHandler seek to ${seconds}`);
        this.remotePlayer.currentTime = seconds
        this.remotePlayerController.seek();
    }

    /**
     * Stop the casting session
     */
    stopCast() {
        if (!this.casting) {
            throw new Error("[HLS] ChromecastHandler not connected!");
        }
        this.casting = false;
        const castSession = cast.framework.CastContext.getInstance().getCurrentSession();
        castSession.endSession(true);
    }

    /**
     * Change the chromecast subtitle language
     * 
     * @param {string} language - The language to set the chromecast subtitle to 
     */
    setSubtitle(language) {
        if (!this.casting) {
            throw new Error("[HLS] ChromecastHandler not connected!");
        }
        const media = cast.framework.CastContext.getInstance().getCurrentSession().getMediaSession();
        const tracks = media.media.tracks;
        const activeTracks = [];
        let foundSubtitle = false;
        let foundVideo = false;
        for (let track of tracks) {
            if (track.type == "TEXT" && track.language == language && !foundSubtitle) {
                activeTracks.push(track.trackId);
                foundSubtitle = true;
            } else if (track.type == "VIDEO" && !foundVideo) {
                // TODO: Select current active video track
                activeTracks.push(track.trackId);
                foundVideo = true;
            }

            if (foundSubtitle && foundVideo) {
                break;
            }
        }
        const tracksInfoRequest = new chrome.cast.media.EditTracksInfoRequest(activeTracks);
        media.editTracksInfo(tracksInfoRequest,
            () => {console.log(`[HLS] Success changing chromecast language to ${language}`)},
            (err) => {console.log(`[HLS] Error changing chromecast subtitle: ${err}`)}
        );
    }

    /**
     * Called when the requestSession() promise resolves.
     */
    requestChromecastSessionSuccess() {
        const castSession = cast.framework.CastContext.getInstance().getCurrentSession();
        const mediaInfo = new chrome.cast.media.MediaInfo(this.src, "application/x-mpegURL");
        const request = new chrome.cast.media.LoadRequest(mediaInfo);

        castSession.loadMedia(request).then(() => {
            this.casting = true;
            this.remotePlayer = new cast.framework.RemotePlayer();
            this.remotePlayerController = new cast.framework.RemotePlayerController(this.remotePlayer);
            this.seek(this.initialSeek);
            this.setupListeners();
            console.log("[HLS] ChromecastHandler Started casting!");
        }).catch((error) => {
            console.log(`[HLS] ChromecastHandler casting error: ${error}`)
        });
    }

    /**
     * Sets up the listeners for the remote player
     */
    setupListeners() {
        this.remotePlayerController.addEventListener(
            cast.framework.RemotePlayerEventType.MEDIA_INFO_CHANGED, 
            this.mediaInfoChanged
        );
        this.remotePlayerController.addEventListener(
            cast.framework.RemotePlayerEventType.CURRENT_TIME_CHANGED,
            this.updateProgress
        );
        this.remotePlayerController.addEventListener(
            cast.framework.RemotePlayerEventType.IS_CONNECTED_CHANGED,
            this.isConnectedChanged
        )
    }

    /**
     * Updates the progress of the video to the owner of this instance
     */
    updateProgress() {
        const currentTime = Math.floor(this.remotePlayer.currentTime);
        const duration = this.remotePlayer.duration;
        this.progressChangedCallback(currentTime, duration);
    }

    /**
     * Called when the requestSession() promise rejects.
     * @param {string} error 
     */
    requestChromecastSessionError(error) {
        console.log(`[HLS] ChromecastHandler attach error: ${error}`);
    }

    /**
     * Requests a new chromecast session
     * 
     * @param {string} seconds - The seconds to seek to
     */
    requestChromecastSession(seconds) {
        this.initialSeek = seconds;
        cast.framework.CastContext.getInstance().requestSession()
        .then(this.requestChromecastSessionSuccess)
        .catch(this.requestChromecastSessionError);
    }

    /**
     * Called when the chromecast disconnects
     */
     isConnectedChanged() {
        const connected = this.remotePlayer.isConnected
        console.log(`[HLS] ChromecastHandler isConnectedChanged, connected: ${connected}`);
        if (!connected) {
            this.casting = false;
            this.disconnect();
        }
    }

    /**
     * Called when the media info changes
     */
    mediaInfoChanged() {
        const session = cast.framework.CastContext.getInstance().getCurrentSession();
        if (!session) {
            return;
        }
        const mediaStatus = session.getMediaSession();
        if (!mediaStatus) {
            return
        }
        console.log(mediaStatus);
        console.log("[HLS] ChromecastHandler mediaInfoChanged");
    }

    /**
     * Initializes the chromecast api
     */
    initializeCastApi() {
        cast.framework.CastContext.getInstance().setOptions({
            receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID
        });
    }
}
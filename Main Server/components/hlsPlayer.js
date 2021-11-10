import Styles from './hlsPlayer.module.css';
import Head from 'next/head'
import Router from 'next/router';
import validateServerAccess from '../lib/validateServerAccess';
import videojs from "video.js";

require('videojs-contrib-quality-levels');
require('videojs-hls-quality-selector');

require('@silvermine/videojs-chromecast')(videojs);
import "video.js/dist/video-js.css";

export default class HlsPlayer extends React.Component {
    constructor(props) {
        super(props);

        this.server = this.props.server;
        this.id = this.props.id;
        this.type = this.props.type;

        this.title = ""
        this.player = undefined;
        this.videoNode = undefined;
        this.videoContainer = undefined;
        this.updateProgressInterval = undefined;
        this.videoJsOptions = {
            autoplay: false,
            controls: true,
            techOrder: ["chromecast", "html5"],
            responsive: true,
            fluid: true,
            sources: [
                {
                    src: this.props.src,
                    type: "application/x-mpegURL"
                }
            ],
            html5: {
                nativeAudioTracks: false,
                nativeVideoTracks: false,
                vhs: {
                    overrideNative: true,
                }
            },
            chromecast: {
                requestTitleFn: this.chromecastRequestTitle.bind(this),
            }
        }
    }

    setTitle(title) {
        this.title = title;
    }

    togglePlay() {
        if (this.player.paused()) {
            this.updateProgressInterval = setInterval(this.updateVideoProgress.bind(this), 5000);
            this.player.play();
        } else {
            this.player.pause();
            this.updateVideoProgress();
            clearInterval(this.updateVideoProgress);
        }
    }

    show(startTime=0) {
        this.videoContainer.style.display = 'block';
        this.videoNode.currentTime = startTime;
        this.togglePlay();
    }

    chromecastRequestTitle(source) {
        console.log(`Sending ${this.title} as title to Chromecast`);
        console.log(source);
        return this.title;
    }

    componentDidMount() {
        this.player = videojs(this.videoNode, this.videoJsOptions, () => {
            this.player.chromecast();
            console.log('HLS Player is ready');
        });
        this.player.hlsQualitySelector({
            displayCurrentQuality: true,
        });
        this.videoNode.onpause = () => {
            this.updateVideoProgress();
            clearInterval(this.updateVideoProgress);
        }
    }

    componentWillUnmount() {
        if (this.player) {
            this.player.dispose();
        }
    }

    updateVideoProgress() {
        validateServerAccess(this.server, (serverToken) => {
            // Update current time, videoNode can be undefined if the video is being chromecasted
            if (this.videoNode != undefined) {
                fetch(`${this.server.server_ip}/api/video/${this.id}/currenttime/set?type=${this.type}&time=${this.videoNode.currentTime}&videoDuration=${this.videoNode.duration}&token=${serverToken}`);
            }
        });
    }

    render() {
        return (
            <>
                <Head>
                    <script type="text/javascript" src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"></script>
                </Head>
                <div className={Styles.videoContainer} ref={node => this.videoContainer = node}>
                    <div data-vjs-player>
                        <video ref={node => this.videoNode = node} className="video-js vjs-default-skin" playsInline />
                    </div>
                </div>
          </>
        );
    }
}
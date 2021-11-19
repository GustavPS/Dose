import { Component } from 'react';
import Iframe from 'react-iframe'
import Styles from './videoTrailer.module.css';

export default class VideoTrailer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoPath: `https://www.youtube.com/embed/${props.videoPath}?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=0&autoplay=1`
        }
        this.onClose = props.onClose;

        this.detectClose = this.detectClose.bind(this);
    }

    componentDidMount() {
        document.addEventListener("keydown", this.detectClose, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.detectClose, false);
    }

    detectClose(event) {
        if (event.keyCode === 27) {
            this.onClose();
        }
    }

    render() {
        return (
            <>
                <Iframe url={this.state.videoPath}
                        width="100%"
                        height="100%"
                        id="myId"
                        className={Styles.trailer}
                        allow="autoplay"
                        frameBorder="0"
                        display="initial"
                        position="fixed"/>
            </>
        )
    }
}
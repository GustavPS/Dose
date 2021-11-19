import style from './movieBackdrop.module.css';
import validateServerAccess from '../lib/validateServerAccess';
import { Component } from 'react';

export default class MovieBackdrop extends Component {
    constructor(props) {
        super(props);
        this.title = props.title;
        this.overview = props.overview;
        this.poster = props.poster
        this.runtime = props.runtime;
        this.backdrop = props.backdrop;
        this.id = props.id;
        this.time = props.time ? props.time : null;
        this.runtime = props.runtime ? props.runtime : null;
        this.markAsDoneButton = props.markAsDoneButton;
        this.showTitle = props.showTitle;
        this.multipleRows = props.multipleRows ? props.multipleRows : null;
        this.animate = props.animate ? props.animate : false
        this.markAsWatched = this.markAsWatched.bind(this);
    }

    markAsWatched() {
        validateServerAccess(server, (serverToken) => {
            fetch(`${server.server_ip}/api/movies/${id}/setWatched?watched=true&token=${serverToken}`)
            .then(r => r.json())
            .then(status => {
                if (status.success) {
                    this.props.unMountMe();
                } else {
                    console.log("ERROR MARKING AS WATCHED: " + status);
                }
            }).catch(err => {
                console.log(err);
            });
        });
    }

    getStyle() {
        if (this.showTitle) {
            return {opacity: '1'};
        } else {
            return {};
        }
    }

    getBackdropStyle() {
        let style = {
            backgroundImage: `url('${this.backdrop}')`
        }
        if (this.multipleRows) {
            style.marginBottom = "20px";
            style.width = "445px";
        }
        return style;
    }

    getAnimation() {
        if(this.animate) {
            return style.backdropWithAnimation
        }
        return ''
    }

    render() {

        return (
            <div onClick={() => this.props.onClick(this.id)} className={style.backdrop + ' ' + this.getAnimation()} style={this.getBackdropStyle()}>
                <h3 className={style.title} style={this.getStyle()}>{this.title}</h3>
                <p className={style.overview}>
                    {this.overview.substring(0, 150)}{this.overview.length > 150 ? '...' : ''}
                </p>
                {this.time != null && this.runtime != null &&
                    <progress className={style.progress} value={this.time} max={this.runtime}></progress>
                }
            </div>
        )
    }
}
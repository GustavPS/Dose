import Styles from './actor.module.css';
import { Component } from 'react';

export default class Actor extends Component {
    constructor(props) {
        super(props);
        this.name = props.name;
        this.characterName = props.characterName;
        this.image = props.image;
        this.id = props.id;
    }

    render() {
        return (
            <div className={Styles.actorBox}>
                <div className={Styles.actorImage} style={{backgroundImage: `url('https://image.tmdb.org/t/p/w500${this.image}')`}}>

                </div>
                <h2>{this.name}</h2>
                <p>as {this.characterName}</p>
            </div>
        )
    }
}

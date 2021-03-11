import style from './episodePoster.module.css';


export default class EpisodePoster extends React.Component {
    constructor(props) {
        super(props);
        this.show = props.show;
        this.season = props.season;
        this.episode = props.episode;
        this.poster = props.poster
        this.backdrop = props.backdrop;
        this.internalEpisodeID = props.internalEpisodeID;
        this.state = {
            img: this.poster,
            hover: false
        };

        this.toggleHover = this.toggleHover.bind(this);
    }

    toggleHover() {
        /*
        let newImg;
        if (!this.state.hover) {
            newImg = this.backdrop;
        }  else {
            newImg = this.poster
        }
        this.setState({
            img: newImg,
            hover: !this.state.hover
        });
        */

    }

    render() {
        let stateStyle = {
            backgroundImage: `url('${this.state.img}')`
        }

        return (
            <div onClick={() => this.props.onClick(this.season, this.episode, this.show, this.internalEpisodeID)} className={style.poster} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} >
                <div className={style.posterImage} style={stateStyle}>
                    <div className={style.episodeInfo}>
                        <h3 className={style.seasonName}>S{this.season} E{this.episode}</h3>
                    </div>
                </div>
            </div>


                

        )
    }
}
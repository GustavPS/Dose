import style from './episodeRow.module.css';


export default class SeasonPoster extends React.Component {
    constructor(props) {
        super(props);
        this.name = props.name
        this.episode = props.episode
        this.backdrop = props.backdrop
        this.overview = props.overview
    }

    render() {

        return (
            <div className={style.row}>
                <div onClick={() => this.props.onClick(this.episode)} className={style.backdrop}  style={{backgroundImage: `url('${this.backdrop}')`}}>
                    <div className={style.playIcon}></div>
                </div>
                <div className={style.episodeInformation}>
                    <h3>{this.episode}. {this.name}</h3>
                    <p className={style.overview}>{this.overview}</p>
                </div>
            </div>

        )
    }
}
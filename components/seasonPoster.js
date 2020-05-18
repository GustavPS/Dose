import style from './seasonPoster.module.css';


export default class SeasonPoster extends React.Component {
    constructor(props) {
        super(props);
        this.season = props.title;
        this.name = props.name
        this.poster = props.poster
        this.id = props.id;
    }

    render() {

        return (
            <div onClick={() => this.props.onClick(this.id)} className={style.poster}>
                <div className={style.posterImage} style={{backgroundImage: `url('${this.poster}')`}}></div>
                <h3 className={style.seasonName}>{this.name}</h3>
            </div>
        )
    }
}
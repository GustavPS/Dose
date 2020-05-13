import style from './movieBackdrop.module.css';


export default class MovieBackdrop extends React.Component {
    constructor(props) {
        super(props);
        this.title = props.title;
        this.overview = props.overview;
        this.poster = props.poster
        this.runtime = props.runtime;
        this.backdrop = props.backdrop;
    }

    render() {
        return (
            <div onClick={this.props.onClick} className={style.backdrop} style={{backgroundImage: `url('${this.backdrop}')`}}>
                <h3 className={style.title}>{this.title}</h3>
                <p className={style.overview}>
                    {this.overview.substring(0, 150)}{this.overview.length > 150 ? '...' : ''}
                </p>
            </div>
        )
    }
}
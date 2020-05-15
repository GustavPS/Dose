import style from './movieBackdrop.module.css';


export default class MovieBackdrop extends React.Component {
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
    }

    render() {
        return (
            <div onClick={() => this.props.onClick(this.id)} className={style.backdrop} style={{backgroundImage: `url('${this.backdrop}')`}}>
                <h3 className={style.title}>{this.title}</h3>
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
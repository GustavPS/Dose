import style from './serverBox.module.css';


export default class ServerBox extends React.Component {
    constructor(props) {
        super(props);

        this.serverName = props.name;
        this.serverAdress = props.adress;
    }

    render() {
        return (
            <div onClick={this.props.onClick} className={style.server}>
                <h5>{this.serverName}</h5>
                <p>{this.serverAdress}</p>
            </div>
        )
    }
}
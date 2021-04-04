import style from './connectCode.module.css';

export default class ConnectCode extends React.Component {
    constructor(props) {
        super(props);
        this.code = props.code;
    }

    render() {
        return (
            <div>
                <h3 className={style.code}>{this.code}</h3>
            </div>
        )
    }
}

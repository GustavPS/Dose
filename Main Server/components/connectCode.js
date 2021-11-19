import style from './connectCode.module.css';
import { Component } from 'react';

export default class ConnectCode extends Component {
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

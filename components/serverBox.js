import style from './serverBox.module.css';
import { useRef } from 'react';


export default class ServerBox extends React.Component {
    constructor(props) {
        super(props);
        this.imgRef = React.createRef();


        this.serverName = props.name;
        this.serverAdress = props.adress;
        this.checkStatus();
    }

    fetchWithTimeout(url, options, timeout = 5000) {
        return Promise.race([
            fetch(url, options),
            new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), timeout))
        ]);
    }

    checkStatus() {
        this.fetchWithTimeout(`${this.serverAdress}/api/ping`, {}, 5000)    
        .then(() => {
            this.imgRef.current.classList.add(style.statusSuccess);
        })
        .catch(e => {
            this.imgRef.current.classList.add(style.statusError);
        });
    }

    render() {
        return (
            <div onClick={this.props.onClick} className={style.server}>
                <h5>{this.serverName}</h5>
                <div className={style.statusBox}>
                    <img ref={this.imgRef} className={style.statusImage} width="40"/>
                </div>
                <p>{this.serverAdress}</p>
            </div>
        )
    }
}

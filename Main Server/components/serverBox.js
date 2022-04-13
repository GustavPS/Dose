import style from './serverBox.module.css';
import { useRef } from 'react';
import { Component, createRef } from 'react';

export default class ServerBox extends Component {
    constructor(props) {
        super(props);
        this.imgRef = createRef();


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
        .then((res) => {
            // check so that the server we are pinging is responding to the request
            if(res.status == 200) {
                this.imgRef.current.classList.add(style.statusSuccess);
            } else {
                this.imgRef.current.classList.add(style.statusError);
            }
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
                    <img alt="" ref={this.imgRef} className={style.statusImage} width="40"/>
                </div>
                <p>{this.serverAdress}</p>
            </div>
        )
    }
}

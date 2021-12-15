import { Component } from 'react';
import React from 'react';
import Styles from '../../../styles/setup.module.css';
import cookie from 'js-cookie';
import { Form, Button } from 'react-bootstrap';
import Router from 'next/router'


export default class Register extends Component {
    constructor(props) {
        super(props);
        this.host = props.host;

        this.state = {
            email: '',
            password: '',
            repeatedPassword: '',
            username: '',
            mainServerUrl: '',
            statusMessage: ''
        }
        this.createAdminAccount = this.createAdminAccount.bind(this);
    }

    componentDidMount() {
        this.stepDone();
    }
    
    stepDone() {
        fetch(`${this.host}/api/dashboard/setup/status`)
        .then((r) => r.json())
        .then(result => {
            if (result.done) {
                Router.push('/dashboard');
            } else if (!result.database) {
                Router.push('/dashboard/setup/database');
            }
        });
    }

    getAccessToken(username, password) {
        return new Promise((resolve, reject) => {
            fetch(`${this.host}/api/dashboard/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }).then(res => res.json()).then(res => {
                if (res.status == 'success') {
                    cookie.set('dashToken', res.token, {expires: 7});
                    cookie.set('dashRefreshToken', res.refreshToken, {expires: 7});
                    cookie.set('dashValidTo', res.validTo, {expires: 7});
                    resolve();
                } else {
                    reject(res.message);
                }
            })
            .catch(err => {
                reject(err);
            });
        });

    }

    createAdminAccount(e) {
        e.preventDefault();
        if (this.state.password !== this.state.repeatedPassword) {
            this.setState({statusMessage: "Passwords don't match"});
        } else {
            this.setState({statusMessage: ""});
            fetch(`${this.host}/api/dashboard/setup/account`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                    mainServerUrl: this.state.mainServerUrl
                })
            })
            .then((r) => r.json())
            .then(result => {
                if (result.success) {
                    this.getAccessToken(this.state.username, this.state.password).then(() => {
                        Router.push('/dashboard/setup/libraries');
                    }).catch(err => {
                        this.setState({statusMessage: err});
                    });
                } else {
                    this.setState({ statusMessage: `Error: ${result.error}`});
                }
            })
            .catch(err => {
                this.setState({ statusMessage: err.message });
                console.log(err);
            });
        }
        return false;
    }

    render() {
        return (
            <div className={Styles.container} style={{ height: '100vh' }}>
                <div className={Styles.loginForm}>
                    <h2 className={Styles.header}>Create admin account</h2>
                    <div style={{ clear: 'both' }}></div>
                    <Form onSubmit={this.createAdminAccount}>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" onChange={(e) => this.setState({ username: e.target.value })} />
                        </Form.Group>
    
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => this.setState({ password: e.target.value })} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Repeat password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => this.setState({ repeatedPassword: e.target.value })} />
                        </Form.Group>
                        <br/>

                        <h2 className={Styles.header}>Main server url</h2>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Url/IP</Form.Label>
                            <Form.Control type="text" placeholder="127.0.0.1:3001" onChange={(e) => this.setState({ mainServerUrl: e.target.value })} />
                        </Form.Group>
                        <br/>
                        <Button variant="primary" onClick={this.createAdminAccount}>
                            Submit
                        </Button>
                        <input type="submit" style={{ display: 'none' }} />
                        <p id="statusMessage" style={{float: 'right', color: 'red'}}>{this.state.statusMessage}</p>
                    </Form>
                </div>
            </div>
        )
    }
}

export async function getServerSideProps(context) {
    let host = context.req.headers.host;
    if (context.req.rawHeaders.includes('https')) {
        host = `https://${host}`;
    } else {
        host = `http://${host}`;
    }
    return {
        props: { host },
    }
}
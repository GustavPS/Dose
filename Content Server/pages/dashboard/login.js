import { Component } from 'react';
import React from 'react';
import Styles from '../../styles/setup.module.css';
import cookie from 'js-cookie';
import { Form, Button } from 'react-bootstrap';
import Router from 'next/router'


export default class Register extends Component {
    constructor(props) {
        super(props);
        this.host = props.host;
        this.state = {
            username: '',
            password: '',
            statusMessage: ''
        }

        console.log(props)

        this.login = this.login.bind(this);
        console.log("lmao")
    }

    login(e) {
        e.preventDefault();
        fetch(`${this.host}/api/dashboard/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        }).then(res => res.json()).then(res => {
            if (res.status == 'success') {
                cookie.set('dashToken', res.token, {expires: 7});
                cookie.set('dashRefreshToken', res.refreshToken, {expires: 7});
                cookie.set('dashValidTo', res.validTo, {expires: 7});
                Router.push('/dashboard');
            } else {
                this.setState({ statusMessage: res.message });
            }
        });
    }

    render() {
        return (
            <div className={Styles.container} style={{ height: '100vh' }}>
                <div className={Styles.loginForm}>
                    <h2 className={Styles.header}>Login</h2>
                    <div style={{ clear: 'both' }}></div>
                    <Form onSubmit={this.login}>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" onChange={(e) => this.setState({ username: e.target.value })} />
                        </Form.Group>
    
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => this.setState({ password: e.target.value })} />
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
    if (context.req.secure) {
        host = `https://${host}`;
    } else {
        host = `http://${host}`;
    }
    return {
        props: { host },
    }
}
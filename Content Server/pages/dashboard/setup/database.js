import { Component } from 'react';
import Router from 'next/router'
import React from 'react';
import Styles from '../../../styles/setup.module.css';
import { Form, Button } from 'react-bootstrap';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.host = props.host;

        this.state = {
            username: '',
            password: '',
            host: '',
            dbName: '',
            port: 0,
            statusMessage: '',
            existingDatabase: false
        }
        this.createDatabase = this.createDatabase.bind(this);
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
            } else if (result.database) {
                Router.push('/dashboard/setup/account');
            }
        });
    }

    createDatabase(e) {
        fetch(`${this.host}/api/dashboard/setup/database`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                host: this.state.host,
                port: this.state.port,
                dbName: this.state.dbName,
                existingDatabase: this.state.existingDatabase
            })
        })
        .then((r) => r.json())
        .then(result => {
            if (result.success) {
                Router.push('/dashboard/setup/account');
            } else {
                this.setState({ statusMessage: `Error: ${result.message}`});
            }
            console.log(result);
        })
        .catch(err => {
            this.setState({ statusMessage: err.message });
            console.log(err);
        });
        return false;
    }

    render() {
        return (
            <div className={Styles.container} style={{ height: '100vh' }}>
                <div className={Styles.loginForm}>
                    <h2 className={Styles.header}>Setup database</h2>
                    <p className={Styles.header}>Enter the <strong>postgresql</strong> details</p>
                    <div style={{ clear: 'both' }}></div>
                    <Form onSubmit={this.createDatabase}>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" onChange={(e) => this.setState({ username: e.target.value })} />
                        </Form.Group>
    
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => this.setState({ password: e.target.value })} />
                        </Form.Group>

                        <Form.Group controlId="formBasicDbName">
                            <Form.Label>Database name</Form.Label>
                            <Form.Control type="text" placeholder="Database name" onChange={(e) => this.setState({ dbName: e.target.value })} />
                        </Form.Group>

                        <Form.Group controlId="formBasicHost">
                            <Form.Label>Host</Form.Label>
                            <Form.Control type="text" placeholder="Host" onChange={(e) => this.setState({ host: e.target.value })} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPort">
                            <Form.Label>Port</Form.Label>
                            <Form.Control type="text" placeholder="Port" onChange={(e) => this.setState({ port: e.target.value })} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPort">
                            <Form.Label style={{marginLeft: '3px'}}>Existing database</Form.Label>
                            <Form.Check style={{float: 'left'}} type="checkbox" onChange={(e) => this.setState({ existingDatabase: e.currentTarget.checked })} />
                        </Form.Group>
                        <br/>
                        <Button variant="primary" onClick={this.createDatabase}>
                            Submit
                        </Button>
                        <input type="submit" style={{ display: 'none' }} />
                        <p id="statusMessage" style={{float: 'right'}}>{this.state.statusMessage}</p>
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
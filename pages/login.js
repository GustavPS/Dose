import Head from 'next/head'
import Link from 'next/link';
import Layout from '../components/layout'
import LoginStyle from '../styles/login.module.css';
import { Form, Button } from 'react-bootstrap';
import cookie from 'js-cookie';
import Router from 'next/router';


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: ''
    }

    this.login = this.login.bind(this);
}

login(e) {
  e.preventDefault();
    let serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    fetch(`${serverUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
        }),
    })
    .then((r) => r.json())
    .then((data) => {
      if (data && data.status === 'error') {
        let statusElement = document.getElementById("statusMessage");
        statusElement.innerHTML = data.message;
        // Show login error
      } else if (data && data.status === 'success') {
        cookie.set('token', data.token, {expires: 2});
        cookie.set('refreshToken', data.refreshToken, {expires: 2});
        cookie.set('validTo', data.validTo, {expires: 2});
        Router.push('/');
      }
    });
}

  render() {
    return (
      <Layout home relative>
        <Head>
          <title>Login</title>
        </Head>

        <div className={LoginStyle.container}>
        <div className={LoginStyle.loginForm}>
            <h3 id="statusMessage"></h3>
            <h1>Login</h1>
            <Link href={"/register"}><a className={LoginStyle.registerLink}>Don't have an account? Register now!</a></Link>
            <div style={{clear: 'both'}}></div>
            <Form onSubmit={this.login}>
          <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" onChange={(e) => this.setState({username: e.target.value})}/>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => this.setState({password: e.target.value})}/>
          </Form.Group>
          <Button variant="primary" onClick={this.login}>
              Login
          </Button>
          <input type="submit" style={{display: 'none'}} />
      </Form>
        </div>
        </div>

      </Layout>
    )
  }
}
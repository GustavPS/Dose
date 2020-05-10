import Head from 'next/head'
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

login() {
    fetch('/api/auth/login', {
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
        // Show login error
      } else if (data && data.status === 'success') {
        cookie.set('token', data.token, {expires: 2});
        Router.push('/');
      }
    });
}

  render() {
    return (
      <Layout home>
        <Head>
          <title>Login</title>
        </Head>

        <div className={LoginStyle.loginForm}>
            <h1>Login</h1>
            <Form>
          <Form.Group controlId="formBasicUsername">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="text" placeholder="Enter username" onChange={(e) => this.setState({username: e.target.value})}/>
              <Form.Text className="text-muted">
              We'll never share your email with anyone else.
              </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => this.setState({password: e.target.value})}/>
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" onClick={this.login}>
              Submit
          </Button>
      </Form>
        </div>
      </Layout>
    )
  }
}
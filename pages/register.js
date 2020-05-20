import Head from 'next/head'
import Layout from '../components/layout'
import LoginStyle from '../styles/login.module.css';
import { Form, Button } from 'react-bootstrap';


export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: '',
        username: ''
    }

    this.login = this.login.bind(this);
}

login() {
    fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: this.state.email,
            password: this.state.password,
            username: this.state.username
        }),
    })
    .then((r) => r.json())
    .then((data) => {
    });
}

  render() {
    return (
      <Layout home>
        <Head>
          <title>Register</title>
        </Head>

        <div className={LoginStyle.loginForm}>
            <h1>Register</h1>
            <Form>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Username" onChange={(e) => this.setState({username: e.target.value})}/>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={(e) => this.setState({email: e.target.value})}/>
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
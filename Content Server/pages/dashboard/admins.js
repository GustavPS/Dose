import { Component } from 'react';
import React from 'react';
import Layout from '../../components/layout';
import validateDashboardAccess from '../../lib/validateDashboardAccess';
import { Form } from 'react-bootstrap';
import Table from '../../components/table/table';


export default class Register extends Component {
    constructor(props) {
        super(props);
        this.host = props.host;

        this.state = {
            admins: [],
            users: [],
            username: '',
            password: '',
            statusMessage: '',
            createUser: {
                username: '',
                hasAccess: true
            }
        }

        this.createAdmin = this.createAdmin.bind(this);
        this.createUser = this.createUser.bind(this);
    }

    componentDidMount() {
        this.getAdminList();
        this.getUserList();
    }

    getColumns() {
        return [
            {
                title: 'Username',
                key: 'username',
                render: () => (
                    <th scope="col">
                        <span className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</span>
                    </th>
                ),
                dataRender: (column) => (
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                            <div className="ml-4">
                                <div className="text-sm font-medium text-white">{column.value}</div>
                            </div>
                        </div>
                    </td>
                )
            },
            {
                title: 'Delete',
                key: 'delete',
                render: () => (
                    <th></th>
                ),
                dataRender: (admin) => (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900" onClick={() => this.deleteAdmin(admin.extra.id)}>
                            {admin.value}
                        </a>
                    </td>
                )
            }
        ]
    }

    getUserColumns() {
        return [
            {
                title: 'Username',
                key: 'username',
                render: () => (
                    <th scope="col">
                        <span className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</span>
                    </th>
                ),
                dataRender: (column) => (
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                            <div className="ml-4">
                                <div className="text-sm font-medium text-white">{column.value}</div>
                            </div>
                        </div>
                    </td>
                )
            },
            {
                title: 'Have access',
                key: 'access',
                render: () => (
                    <th scope="col" className="text-right">
                        <span className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Have access</span>
                    </th>
                ),
                dataRender: (data) => (
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                        <input type="checkbox" checked={data.value} onChange={(event) => this.setAccess(data.extra.id, event.target.checked)} />
                    </td>
                )
            },
            {
                title: 'Delete',
                key: 'delete',
                render: () => (
                    <th scope="col" className="text-right">
                        <span className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</span>
                    </th>
                ),
                dataRender: (user) => (
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900" onClick={() => this.deleteUser(user.extra.id, user.extra.username)}>
                            {user.value}
                        </a>
                    </td>
                )
            }
        ]
    }

    getUserData() {
        return this.state.users.map(user => {
            return [
                {
                    key: 'username',
                    value: user.username,
                },
                {
                    key: 'access',
                    value: user.has_access,
                    extra: {
                        id: user.id
                    }
                },
                {
                    key: 'delete',
                    value: 'Delete',
                    extra: {
                        id: user.id,
                        username: user.username
                    }
                }
            ]
        });
    }

    getData() {
        return this.state.admins.map(admin => {
            return [
                {
                    key: 'delete',
                    value: 'Delete',
                    extra: {
                        id: admin.id
                    }
                },
                {
                    key: 'username',
                    value: admin.username,
                }
            ]
        });
    }

    getAdminList() {
        validateDashboardAccess().then(token => {
            fetch(`${this.host}/api/dashboard/admin/getList?token=${token}`).then(res => res.json())
                .then(data => {
                    this.setState({
                        admins: data
                    });
                });
        });
    }

    getUserList() {
        validateDashboardAccess().then(token => {
            fetch(`${this.host}/api/dashboard/users/get?token=${token}`).then(res => res.json()).then(data => {
                this.setState({
                    users: data
                });
            });
        });
    }

    createUser() {
        validateDashboardAccess().then(token => {
            fetch(`${this.host}/api/dashboard/users/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.createUser.username,
                    token: token
                })
            }).then(res => res.json()).then(res => {
                if (res.success) {
                    this.setState({
                        statusMessageUser: ''
                    });
                    this.getUserList();
                } else {
                    this.setState({
                        statusMessageUser: res.error
                    });
                }
            });
        });
    }

    createAdmin() {
        validateDashboardAccess().then(token => {
            fetch(`${this.host}/api/dashboard/admin/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                    token: token
                })
            }).then(res => res.json()).then(res => {
                if (res.success) {
                    this.setState({
                        statusMessage: ''
                    });
                    this.getAdminList();
                } else {
                    this.setState({
                        statusMessage: res.error
                    });
                }
            });
        });
    }


    deleteAdmin(id) {
        validateDashboardAccess().then(token => {
            fetch(`${this.host}/api/dashboard/admin/delete?token=${token}&id=${id}`).then(response => {
                if (response.status === 200) {
                    this.setState({
                        statusMessage: ''
                    });
                    this.getAdminList();
                } else if (response.status === 406) {
                    this.setState({
                        statusMessage: 'You cannot delete yourself'
                    });
                }
            });
        });
    }

    deleteUser(id, username) {
        validateDashboardAccess().then(token => {
            fetch(`${this.host}/api/dashboard/users/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    username: username,
                    token: token,
                })
            }).then(response => {
                this.getUserList();
            });
        });
    }

    setAccess(id, access) {
        validateDashboardAccess().then(token => {
            fetch(`${this.host}/api/dashboard/users/access`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    token: token,
                    access: access
                })
            }).then(response => {
                this.getUserList();
            });
        });
    }

    newUserNameChanged(value) {
        this.setState(prevState => ({
            createUser: {
                ...prevState.createUser,
                username: value
            }
        }));
        console.log(this.state.createUser.username);
    }

    render() {
        return (
            <Layout>
                <Table title="Admin accounts" columns={this.getColumns()} data={this.getData()}></Table>
                <br />
                <div className=" flex flex-wrap relative">
                    <Form.Control className="w-40 mr-3 bg-gray-800 border-gray-900 focus:bg-gray-800 text-white" type="text" placeholder="Username" onChange={(e) => this.setState({ username: e.target.value })} />

                    <Form.Control className="w-40 mr-3 bg-gray-800 border-gray-900 focus:bg-gray-800 text-white" type="password" placeholder="Password" onChange={(e) => this.setState({ password: e.target.value })} />
                    <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-xs mr-3" onClick={this.createAdmin}>
                        New
                    </button>
                    <p className="text-red-500 text-xs italic">{this.state.statusMessage}</p>
                </div>

                <br></br>
                <Table title="Users" columns={this.getUserColumns()} data={this.getUserData()}></Table>
                <br />
                <div className=" flex flex-wrap relative">
                    <Form.Control className="w-40 mr-3 bg-gray-800 border-gray-900 focus:bg-gray-800 text-white" type="text" placeholder="Username" onChange={(e) => this.newUserNameChanged(e.target.value)} />
                    <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-xs mr-3" onClick={this.createUser}>
                        Create
                    </button>
                    <p className="text-red-500 text-xs italic">{this.state.statusMessageUser}</p>
                </div>
            </Layout>
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
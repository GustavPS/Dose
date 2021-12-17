import { Component } from 'react';
import React from 'react';
import Layout from '../../components/layout';
import validateDashboardAccess from '../../lib/validateDashboardAccess';
import { Form } from 'react-bootstrap';


export default class Register extends Component {
    constructor(props) {
        super(props);
        this.host = props.host;

        this.state = {
            admins: [],
            username: '',
            password: '',
            statusMessage: ''
        }

        this.createAdmin = this.createAdmin.bind(this);
    }

    componentDidMount() {
        this.getAdminList();
    }

    getAdminList() {
        validateDashboardAccess().then(token => {
            fetch(`${this.host}/api/dashboard/admin/getList?token=${token}`).then(res => res.json())
                .then(data => {
                    console.log(data);
                    this.setState({
                        admins: data
                    });
                });
        });
    }

    createAdmin() {
        validateDashboardAccess().then(token => {
            fetch(`${this.host}/api/dashboard/admin/create?token=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
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

    render() {
        return (
            <Layout>
                <h1>Admin accounts</h1>
                <br />
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-900 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-900">
                                    <thead className="bg-gray-800">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Username
                                            </th>
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Delete</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className=" bg-gray-800 divide-y divide-gray-900">
                                        {this.state.admins.map((admin) => (
                                            <tr key={admin.username}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-white">{admin.username}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <a href="#" className="text-indigo-600 hover:text-indigo-900" onClick={() => this.deleteAdmin(admin.id)}>
                                                        Delete
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className=" flex flex-wrap relative">
                    <Form.Control className="w-40 mr-3 bg-gray-800 border-gray-900 focus:bg-gray-800 text-white" type="text" placeholder="Username" onChange={(e) => this.setState({ username: e.target.value })} />

                    <Form.Control className="w-40 mr-3 bg-gray-800 border-gray-900 focus:bg-gray-800 text-white" type="password" placeholder="Password" onChange={(e) => this.setState({ password: e.target.value })} />
                    <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-xs mr-3" onClick={this.createAdmin}>
                        New
                    </button>
                    <p className="text-red-500 text-xs italic">{this.state.statusMessage}</p>
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
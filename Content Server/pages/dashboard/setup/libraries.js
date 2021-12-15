import { Component } from 'react';
import React from 'react';
import Styles from '../../../styles/setup.module.css';
import Router from 'next/router'
import { DirectoryChoice } from '../../../components/directoryChoice';
import { PlusButton } from '../../../components/plusButton';
import Alert from '@material-ui/lab/Alert';
import { Button } from 'react-bootstrap';
import validateDashboardAccess from '../../../lib/validateDashboardAccess';

export default class Libraries extends Component {
    constructor(props) {
        super(props);
        this.host = props.host;

        this.state = {
            libraries: [],
            error: '',
        }
        this.clearErrorTimeout = null;
        this.libraryError = this.libraryError.bind(this);
        this.librarySaved = this.librarySaved.bind(this);
        this.libraryRemove = this.libraryRemove.bind(this);
        this.addNewLibraryRow = this.addNewLibraryRow.bind(this);
        this.saveLibraries = this.saveLibraries.bind(this);
        this.skipStep = this.skipStep.bind(this);
    }

    componentDidMount() {
        this.stepDone();
    }

    stepDone() {
        fetch(`${this.host}/api/dashboard/setup/status`)
            .then((r) => r.json())
            .then(result => {
                if (!result.database) {
                    Router.push('/dashboard/setup/database');
                } else if (!result.admin) {
                    Router.push('/dashboard/setup/account');
                }
            });
    }

    librarySaved(path, id) {
        const libraries = this.state.libraries;
        libraries[id].path = path;
        this.setState({ libraries });
    }

    libraryError(error) {
        if (error === 400) {
            this.setState({ error: 'Access denied' });
        } else {
            this.setState({ error: error });
            console.log(`Library error: `, error);
        }
        if (this.clearErrorTimeout) {
            clearTimeout(this.clearErrorTimeout);
        }
        this.clearErrorTimeout = setTimeout(() => {
            this.setState({ error: '' });
        }, 5000);
    }

    libraryRemove(id) {
        const libraries = this.state.libraries;
        libraries.splice(id, 1);
        this.setState({ libraries });
    }

    addNewLibraryRow() {
        const newLibrary = {
            id: this.state.libraries.length,
            path: '',
            name: '',
            type: 'SERIES' // shows, movies. Default is shows
        }
        this.setState({
            libraries: [...this.state.libraries, newLibrary]
        });
    }

    libraryTypeChanged(id, type) {
        const libraries = this.state.libraries;
        libraries[id].type = type.toUpperCase();
        this.setState({ libraries });
    }

    libraryNameChanged(id, name) {
        const libraries = this.state.libraries;
        libraries[id].name = name;
        this.setState({ libraries });
    }

    validateLibraries() {
        const libraries = this.state.libraries;
        let error = '';
        for (let i = 0; i < libraries.length; i++) {
            if (libraries[i].path === '') {
                error = 'Please fill in all paths';
                break;
            } else if (libraries[i].name === '') {
                error = 'Please fill in all library names';
                break;
            }
        }
        return error;
    }

    skipStep() {
        Router.push('/dashboard');
    }

    saveLibraries() {
        validateDashboardAccess().then((token) => {
            const error = this.validateLibraries();
            if (error !== '') {
                this.libraryError(error);
            } else {
                fetch(`${this.host}/api/dashboard/libraries/add?token=${token}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.state.libraries)
                })
                .then(r => r.json())
                .then(result => {
                    if (result.success) {
                        Router.push('/dashboard');
                    } else {
                        const error = result.errors.join('\n');
                        this.libraryError(error);
                    }
                })
                .catch(error => {
                    console.log(error);
                    this.libraryError(error);
                });
            }
        });
    }

    render() {
        return (
            <>
                {this.state.error != "" &&
                    <Alert style={{ position: "fixed", left: "50%", transform: "translateX(-50%)" }} severity="error" className={'errorAlert'}>{this.state.error}</Alert>
                }
                <div className={Styles.container} style={{ height: '100vh' }}>
                    <div className={Styles.loginForm}>
                        <h2 className={Styles.header}>Add libraries</h2>
                        {this.state.libraries.map((library, index) => {
                            return (
                                <DirectoryChoice
                                    key={index}
                                    id={index}
                                    onSave={this.librarySaved}
                                    onError={this.libraryError}
                                    onRemove={this.libraryRemove}
                                    onTypeChanged={(type) => this.libraryTypeChanged(index, type)}
                                    onNameChanged={(name) => this.libraryNameChanged(index, name)}
                                    onValueSaved={(path) => this.librarySaved(path, index)}
                                />
                            )
                        })
                        }
                        <PlusButton onClick={this.addNewLibraryRow} />

                        {this.state.libraries.length > 0 &&
                            <Button variant="primary" onClick={this.saveLibraries}>
                                Submit
                            </Button>
                        }

                        <Button variant="primary" onClick={this.skipStep}>
                            Skip
                        </Button>
                    </div>
                </div>
            </>
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
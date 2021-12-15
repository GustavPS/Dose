import { Component } from 'react';
import React from 'react';
import Layout from '../../components/layout';
import CountBox from '../../components/countBox';
import Transcoding from '../../components/transcoding';
import validateDashboardAccess from '../../lib/validateDashboardAccess';
import { Router } from 'next/router';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.host = props.host;

        this.state = {
            transcodings: []
        }

        this.movieCount = React.createRef();
        this.showCount = React.createRef();
        this.episodeCount = React.createRef();
    }

    componentDidMount() {
        this.getStats();
        this.getActiveTranscodings();
    }

    getStats() {
        validateDashboardAccess()
        .then(token => {
            fetch(`${this.host}/api/dashboard/getStats?token=${token}`)
            .then(res => res.json())
            .then(data => {
                this.movieCount.current.setCount(data.movieCount);
                this.showCount.current.setCount(data.showCount);
                this.episodeCount.current.setCount(data.episodeCount);
            });
        });
    }

    getActiveTranscodings() {
        validateDashboardAccess()
        .then((token) => {
            fetch(`${this.host}/api/dashboard/transcoding/getActive?token=${token}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    transcodings: data
                });
            });
        })
        .catch(err => {
            Router.push('/');
        })
    }

    render() {
        return (
            <Layout>
                <div className="flex flex-wrap justify-center w-full">
                    <CountBox className="m-5 lg:w-3/12" type="Movies" ref={this.movieCount}  />
                    <CountBox className="m-5 lg:w-3/12" type="Shows" ref={this.showCount} />
                    <CountBox className="m-5 lg:w-3/12" type="Episodes" ref={this.episodeCount} />
                </div>
                <div className=" h-auto p-3.5 shadow-2xl relative">
                    <h2 className="text-gray-200 text-lg ml-2">Active transcodings</h2>
                    <div className="flex h-full flex-wrap w-full md:justify-start justify-center">
                        {this.state.transcodings.map((transcoding, index) => {
                            return <Transcoding className="m-2"
                                                key={index} 
                                                title={transcoding.title}
                                                username={transcoding.user.username}
                                                quality={transcoding.quality}
                                                backdrop={transcoding.backdrop}
                                                progress={transcoding.watchProgress} />
                        })}
                    </div>
                </div>

            </Layout>
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
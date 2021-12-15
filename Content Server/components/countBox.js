import { Component } from 'react';
import React from 'react';
import Link from 'next/link';
import Router from 'next/router'
import 'tailwindcss/tailwind.css';


export default class CountBox extends Component {
    constructor(props) {
        super(props);

        this.type = props.type;
        this.state = {
            count: props.count
        }
    }

    setCount(count) {
        this.setState({
            count: count
        });
    }


    render() {
        return (
            <div className={this.props.className}>
                <div className="align text-black shadow-2xl p-3.5 flex h-auto">
                    <img src="/images/cinema.svg" className="w-10 mr-3" />
                    <p className="text-sm text-white flex justify-center items-center"><strong className="text-2xl mr-1">{this.state.count}</strong>{this.type}</p>
                </div>
            </div>
        )
    }
}
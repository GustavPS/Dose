import { Component } from 'react';
import React from 'react';
import 'tailwindcss/tailwind.css';

export default class Transcoding extends Component {
    constructor(props) {
        super(props);
        this.title = props.title;
        this.username = props.username;
        this.quality = props.quality;
        this.progress = Math.floor(props.progress);
        this.backdrop = `https://image.tmdb.org/t/p/w500/${props.backdrop}`;
    }

    render() {
        return (
            <div className={this.props.className}>
                <div className="align h-44 w-80 text-white shadow-2xl relative flex">
                    <div className="h-44 w-80 bg-cover bg-center opacity-25 absolute top-0 left-0" style={{ backgroundImage: "url('" + this.backdrop + "')" }}></div>
                    <div className="opacity-100">
                        <p className="top-2 left-2 text-lg relative">{this.title}</p>
                        <p className="absolute bottom-5 left-5 text-xs">{this.username}</p>
                        <p className="absolute bottom-5 right-5 text-xs">{this.quality}</p>
                    </div>
                    <div className="pt-1 h-px w-full absolute bottom-0 left-0">
                        <div className="overflow-hidden h-1 mb-4 text-xs flex rounded bg-pink-200">
                            <div
                                style={{ width: `${this.progress}%` }}
                                className="
                                    shadow-none
                                    flex flex-col
                                    text-center
                                    whitespace-nowrap
                                    text-white
                                    justify-center
                                    bg-blue-500
                                "
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
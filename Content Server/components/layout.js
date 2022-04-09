import { Component } from 'react';
import React from 'react';
import Link from 'next/link';
import Router from 'next/router'
import 'tailwindcss/tailwind.css';


export default class Register extends Component {
    constructor(props) {
        super(props);

        this.sidebar = React.createRef();
        this.openNav = this.openNav.bind(this);
    }

    openNav() {
        this.sidebar.current.classList.toggle('-translate-x-full');
    }


    render() {
        return (
            <nav className="relative min-h-screen md:flex">

                {/* Mobile menu bar */}
                <div className="bg-gray-800 text-gray-100 flex justify-between md:hidden">
                    {/* logo */}
                    <a href="#" className="text-white">
                        <img alt="logo" src="/images/logo.png" className="w-50 p-4 filter invert" />
                    </a>

                    {/* Mobile menu botton */}
                    <button onClick={this.openNav} className="p-4 focus:outline-none focus:bg-gray-700">
                        <img alt="menu" src="/images/menu.svg" className="h-5 w-5 filter invert" />
                    </button>
                </div>

                <div ref={this.sidebar} className="bg-gray-800 text-blue-100 w-64 space-y-6 px-2 py-7 absolute inset-y-0 left-0 transform -translate-x-full transition duration-200 ease-in-out
                                md:relative md:translate-x-0">
                    {/* logo */}
                    <a href="#" className="text-white">
                        <img alt="logo" src="/images/logo.png" className="w-100 px-3.5 filter invert" />
                    </a>
                    {/* nav */}
                    <nav>
                        <Link href="/dashboard">
                            <a className="block py-2.5 px-4 rounded hover:bg-blue-700 transition duration-200 hover:text-white">Home</a>
                        </Link>
                        <Link href="/dashboard/admins">
                            <a className="block py-2.5 px-4 rounded hover:bg-blue-700 transition duration-200 hover:text-white">Admin accounts</a>
                        </Link>
                        <Link href="/">
                            <a className="block py-2.5 px-4 rounded hover:bg-blue-700 transition duration-200 hover:text-white">Transcoding</a>
                        </Link>
                        <Link href="/">
                            <a className="block py-2.5 px-4 rounded hover:bg-blue-700 transition duration-200 hover:text-white">Libraries</a>
                        </Link>
                        <Link href="/">
                            <a className="block py-2.5 px-4 rounded hover:bg-blue-700 transition duration-200 hover:text-white">Settings</a>
                        </Link>
                    </nav>
                </div>

                <div className="flex-1 p-10 text-2xl font-bold text-white bg-gray-900">
                    {/* Content */}
                    {this.props.children}
                </div>
            </nav>
        )
    }
}

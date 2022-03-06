import { Component } from 'react';
import React from 'react';
import 'tailwindcss/tailwind.css';
import equal from 'fast-deep-equal';


export default class Table extends Component {
    constructor(props) {
        super(props);
        this.title = props.title;

        this.state = {
            columns: this.props.columns ? this.props.columns : [],
            data: this.props.data ? this.props.data : []
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!equal(this.props.data, prevProps.data)) {
            this.setState({
                data: this.props.data
            });
        }
    }

    renderData(row, columnIndex) {
        for (const column of row) {
            if (column.key === this.state.columns[columnIndex].key) {
                if (this.state.columns[columnIndex].dataRender) {
                    return this.state.columns[columnIndex].dataRender(column);
                } else {
                    return (
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="ml-4">
                                    <div className="text-sm font-medium text-white">{column.value}</div>
                                </div>
                            </div>
                        </td>
                    )
                }
            }
        }
    }

    render() {
        return (
            <>
                <h1>{this.title}</h1>
                <br />
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-900 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-900">
                                    <thead className="bg-gray-800">
                                        <tr scope="col">
                                            {this.state.columns.map(column => (
                                                column.render ? column.render(column.title) : column.title
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className=" bg-gray-800 divide-y divide-gray-900">
                                        {this.state.data.map((row, rowNum) => {

                                            return (
                                                <tr key={rowNum}>
                                                    {row.map((column, columnNum) => {
                                                        return this.renderData(row, columnNum);
                                                    })}
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
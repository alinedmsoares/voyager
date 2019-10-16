import React, { Component } from 'react'
import Menu from '../../components/menu/menu'
import Header from '../../components/header/header'
import Swal from 'sweetalert2'

export default class sendDocument extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            title: '',
            list: [{ id: '', name: '', fieldType: '', status: false, required: false, values: [] }],
            inputType: "",
            status: "new"
        }

        this.updateState = this.updateState.bind(this)

    }
    updateState(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    searchFields() {
        fetch('https://5d8289a9c9e3410014070b11.mockapi.io/document', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ list: data }))
            .catch(error => console.log(error))
    }
    componentDidMount() {
        this.searchFields();
    }
    setFieldType(event) {
        if (event.fieldType == "texto") {
            event.inputType = "text"
        } else if (event.fieldType == "data") {
            event.inputType = "datetime"
        }
    }
    render() {
        const root = this;
        return (
            <div>
                {
                    this.state.list.map(function (document) {
                        return (
                            <li>
                                <label>{document.name}</label>
                                <input type={document.fieldType} />
                            </li>
                        )

                    }
                    )
                }

            </div>

        )
    }

}
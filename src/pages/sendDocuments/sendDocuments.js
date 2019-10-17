import React, { Component } from 'react'
import Menu from '../../components/menu/menu'
import Header from '../../components/header/header'
import Swal from 'sweetalert2'

export default class sendDocument extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            list: [{ id: '', name: '', fieldType: '', status: false, required: false, values: [], response: '' }],
            file: ''
        }

        // this.updateState = this.updateState.bind(this)
        this.updateStateFile = this.updateStateFile.bind(this)
        this.updateStateResponse = this.updateStateResponse.bind(this)

    }
    handleChange(selectorFiles) {
        console.log(selectorFiles)
    }
    // updateState(event) {
    //     this.setState({ [event.target.name]: event.target.value })
    // }
    updateStateResponse(event){
        this.setState({response: event.target.value})
    }
    updateStateFile(event){
        this.setState({file:event.target.value})
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
    registerDocument(event) {
        event.preventDefault();
        fetch('http://5da89906e44c790014cd4f76.mockapi.io/documents', {
            method: 'POST',
            body: JSON.stringify({
                file: this.state.file,
                response: this.state.response
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response)
            .then(this.searchFields.bind(this))
            .catch(error => console.log(error))
    }
    componentDidMount() {
        this.searchFields();
    }

    render() {
        const root = this;
        return (
            <div>
                <form onSubmit={this.registerDocument.bind(this)}>
                {
                    this.state.list.map(function (document) {
                        return (
                            <li>
                                <label>{document.name}</label>
                                <input type={document.fieldType} onChange={this.updateStateResponse} name="response"/>
                            </li>
                        )

                    }
                    )
                }
                <input type="file" onChange={(e) => this.handleChange(e.target.files)} onChange={this.updateStateFile} />
                <button type="submit">Salvar</button>
           </form>
            </div >

        )
    }

}
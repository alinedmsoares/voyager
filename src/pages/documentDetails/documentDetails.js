import React, { Component } from 'react'
import '../../Assets/css/editingViews.css'
import Menu from '../../components/menu/menu'
import Header from '../../components/header/header'

export default class documentDetails extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            fields: [{ id: '', fieldName: '', fieldType: '', visible: false, required: false, values: [] }],
            answers: {},
            date: "",
            attachment: "",
            documentStatus: 0,
            documentId: [],
            update: [{ id: '', updateDescription: '', file: '', /*user: {}*/updateDate: '' }]
        }

        this.updateState = this.updateState.bind(this);
        this.searchForIdDocument = this.searchForIdDocument.bind(this);
    }
    updateState = (event) => {
        this.setState({
            answers: {
                ...this.state.answers,
                [event.target.name]: event.target.value
            }
        })
        console.log(this.state)
    }
    componentDidMount() {
        this.searchFields();
        this.searchAnswers();
        this.searchDocumentsId();
    }
    searchFields() {
        fetch('http://192.168.4.49:5000/api/field', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ field: data })
            })
            .catch(error => console.log(error))
    }
    searchAnswers() {
        fetch('http://192.168.4.49:5000/api/document', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ searchAnswers: data }))
            .catch(error => console.log(error))
    }

    searchDocumentsId() {
        fetch('http://192.168.4.49:5000/api/document/', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(console.log(this.state.documentId[0]))
            .then(data => this.setState({ documentId: data }))
            .catch(error => console.log(error))
    }
    searchForIdDocument(event) {
        console.log(this.state.documentId[0])

    }
    render() {
        return (
            <div>
                <ul>
                    <li>
                        User
                    </li>
                    {this.state.fields.map((field) => {
                        return (
                            <li>{field.fieldName}</li>
                        )
                    })}
                    {this.state.documentId.map((document) => {
                        return (
                            <div>
                                <button data-id={document.id} onClick={this.searchForIdDocument.bind(this)}>a</button>
                                {
                                    Object.entries(document.answers).map(([key, value]) => {
                                        return (
                                            <ul>
                                                <li>{key}</li>
                                                <li>{value}</li>
                                            </ul>
                                        )
                                    })
                                }

                            </div>
                        )
                    })}
                </ul>
            </div>
        )
    }
};




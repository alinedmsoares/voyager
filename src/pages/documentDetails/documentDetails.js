import React, { Component } from 'react'
import '../../Assets/css/editingViews.css'
import Menu from '../../components/menu/menu'
import Header from '../../components/header/header'

export default class documentDetails extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            field: [{ id: '', fieldName: '', jString: '', visible: false, required: false, values: [], fieldTypeString: '' }],
            AttachmentFile: null,
            Attachment: '',
            answersFilters: '',
            answers: {},
            title: '',
            status: '',
            description: '',
            updates: [{ updateDescription: '', file: '', /*user: {}*/updatedatetime: '' }]
        }

        this.updateState = this.updateState.bind(this);
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
        fetch('http://192.168.4.49:5000/api/document/' + 'a5be3b02-ddef-4ff4-b4ff-76f2d9f45806', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ documentId: data }))
            .catch(error => console.log(error))
    }


    render() {
        return (
            <div>
                <ul>
                    <li>
                        User
                    </li>
                    {
                        this.state.field.map((field) => {
                            return (
                                <ul>
                                    <li>{field.fieldName}</li>
                                </ul>
                            )
                        })
                    }
                    <li>
                        {
                            this.state.answerFilters.map((answer) => {
                                return (
                                    <li>{answer}</li>
                                )
                            })
                        })
                                    </li>
                </ul>
            </div>
        )
    }
};




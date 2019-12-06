import React, { Component } from 'react'
import '../../Assets/css/editingViews.css'
import Menu from '../../components/menu/menu'
import Header from '../../components/header/header'

export default class documentDetails extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            answers: {},
            date: "",
            attachment: "",
            documentStatus: 0,
            description: '',
            documentId: [],
            updates: [{ updateDescription: '', file: '', /*user: {}*/updatedatetime: '' }]
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
            .then(data => this.setState({ documentId: data }))
            .catch(error => console.log(error))
    }
    searchForIdDocument(event) {
        let documentsId = event.target.getAttribute('data-id')
        console.log(documentsId)
        let documents = this.state.documentId[documentsId]
        this.setState({
            // id: documents.id,
            answers: documents.answers,
            date: documents.date,
            attachment: documents.attachment,
            documentStatus: documents.documentStatus,
        });

    }
    render() {
        return (
            <div>
                <ul>
                    <li>
                        User
                    </li>
                    {this.state.documentId.map((document)=>{
                        return(
                            <button className="buttonEdit" daa-id={'640855a0-6837-40c5-b485-9fac0bea4d28'} onClick={this.searchForIdDocument.bind(this)}>Editar</button>
                        )
                    })}
                </ul>
            </div>
        )
    }
};




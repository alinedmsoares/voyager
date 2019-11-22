import React, { Component } from 'react'
import Menu from '../../components/menu/menu'
import Header from '../../components/header/header'
import Swal from 'sweetalert2'
import '../../Assets/css/sendDocuments.css'


export default class sendDocument extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            field: [{ id: '', fieldName: '', fieldType: '', visible: false, required: false, values: [] }],
            attachmentupload: [],
            answers: {},
        }

        this.updateState = this.updateState.bind(this);
        this.updateStateFile = this.updateStateFile.bind(this);

    }
    handleChange(selectorfiles) {
        console.log(selectorfiles)
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
    updateStateFile(event) {
        this.setState({
            attachmentupload: event.target.value
        })

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
                console.log(this.state)
            })
            .catch(error => console.log(error))
    }
    registerDocument(event) {
        event.preventDefault();

console.log({
    attachmentupload: this.state.attachmentupload,
    answers: this.state.answers
})

        fetch('http://192.168.4.49:5000/api/document', {
            method: 'POST',
            body: JSON.stringify({
                attachmentupload: this.state.attachmentupload,
                answers: this.state.answers
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(this.AlertSucessRegister())
            .then(response => response)
            .then(this.searchFields())
            .catch(error => console.log(error))
    }

    AlertSucessRegister() {
        Swal.fire(
            'Document enviado!',
            '',
            'success'
        )
    }

    componentDidMount() {
        this.searchFields();
    }

    render() {
        const root = this;
        return (
            <div className="all">
                <Header />
                <Menu />
                <form onSubmit={this.registerDocument.bind(this)} className="form">

                    {
                        this.state.field.map((document) => {
                            if (document.visible === true) {

                                if (document.fieldType === "multipleselection") {
                                    if (document.fieldName !== "Status") {
                                        return (
                                            <div className="inputMovel">
                                                <div>
                                                    <ul>
                                                        <li className="lista">
                                                            <label>{document.fieldName}</label>
                                                            <div className="all-checkbox">
                                                                {
                                                                    this.state.field.map((field, index) => {
                                                                        if (document.fieldName === field.fieldName) {
                                                                            return (
                                                                                field.values.map((values) => {
                                                                                    return (
                                                                                        <div  class="inputGroup">
                                                                                            <input id={`checkbox${index}`} type="checkbox" />
                                                                                            <label htmlFor={`checkbox${index}`}>{values}</label>
                                                                                        </div>







                                                                                        // <label htmlFor={`checkbox${index}`}>
                                                                                        //     {values}
                                                                                        //     <input id={`checkbox${index}`} type="checkbox" />
                                                                                        // </label>
                                                                                        )
                                                                                }))
                                                                        }
                                                                    })
                                                                }
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        )
                                    }
                                } else if (document.fieldType === "list") {
                                    if (document.fieldName !== "Status") {
                                        return (
                                            <div className="inputMovel">
                                                <div>
                                                    <li className="lista">
                                                        <label>{document.fieldName}</label>
                                                        <select name={document.fieldName} type={document.fieldType} className="text" onChange={this.updateState}>

                                                            {
                                                                this.state.field.map((field) => {
                                                                    if (document.fieldName === field.fieldName) {
                                                                        return (
                                                                            field.values.map((values) => {
                                                                                return (
                                                                                    <option selected="selected">{values}</option>
                                                                                )
                                                                            }))
                                                                    }


                                                                })
                                                            }
                                                        </select>
                                                    </li>
                                                </div>
                                            </div>
                                        )
                                    }
                                }
                                else {
                                    return (
                                        <div className="inputMovel">
                                            <div>
                                                <li className="lista">
                                                    <input placeholder={document.fieldName} required={document.required ? "required" : ""} name={document.fieldName} type={document.fieldType} className="text" onChange={this.updateState} />
                                                </li>
                                            </div>
                                        </div>
                                    );
                                }
                            }
                        }
                        )
                    }
                    <input type="file" name="files" className="input-file" multiple onChange={(e) => this.handleChange(e.target.files)} onChange={this.updateStateFile} />
                    <div className="buttons">
                        <button type="reset" className="cancel">Cancelar</button>
                        <button type="submit" className="send">Enviar</button>
                    </div>
                </form>
            </div>

        )
    }

}
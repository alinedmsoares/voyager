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
            files: [],
            answer: { title: '', description: '' },
        }

        this.updateState = this.updateState.bind(this);
        this.updateStateFile = this.updateStateFile.bind(this);
        this.updateStateTitle = this.updateStateTitle.bind(this);
        this.updateStateDescription = this.updateStateDescription.bind(this);
    }
    handleChange(selectorfiles) {
        console.log(selectorfiles)
    }
    updateState = (event) => {
        this.setState({
            answer: {
                ...this.state.answer,
                [event.target.name]: event.target.value
            }
        })
        console.log(this.state)
    }
    updateStateFile(event) {
        this.setState({
            files: event.target.value
        })

    }

    updateStateTitle(event) {
        this.setState({ title: event.target.value })
    }

    updateStateDescription(event) {
        this.setState({ description: event.target.value })
    }

    searchFields() {
        fetch('https://5d8289a9c9e3410014070b11.mockapi.io/document', {
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
        fetch('http://5d8289a9c9e3410014070b11.mockapi.io/respostaDocument', {
            method: 'POST',
            body: JSON.stringify({
                files: this.state.files,
                answer: this.state.answer
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
                            if (document.visible == true) {

                                if (document.fieldType == "multiple-selection") {
                                    return (
                                        <div className="inputMovel">
                                            <div>
                                                <li className="lista">
                                                    <label>{document.fieldName}</label>
                                                    {
                                                        this.state.field.map((value) => {
                                                            return (
                                                                <div>
                                                                    <input placeholder={document.fieldName} name={document.fieldName} type="checkbox" onChange={this.updateState} /><label>{value.values}</label></div>
                                                            )
                                                        })
                                                    }
                                                </li>
                                            </div>
                                        </div>
                                    )
                                } else if (document.fieldType === "list") {
                                    if(document.fieldName != "Status"){
                                    return (
                                        <div className="inputMovel">
                                            <div>
                                                <li className="lista">
                                                    <label>{document.fieldName}</label>
                                                    <select  name={document.fieldName} type={document.fieldType} className="text" onChange={this.updateState}>

                                                        {
                                                            this.state.field.map((value) => {
                                                                if (document.fieldName === value.fieldName) {
                                                                    return (
                                                                        value.values.map((value2) => {
                                                                            return (
                                                                                <option selected="selected">{value2}</option>
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
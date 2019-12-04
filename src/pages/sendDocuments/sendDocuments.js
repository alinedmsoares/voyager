import React, { Component } from 'react'
import Menu from '../../components/menu/menu'
import Header from '../../components/header/header'
import Swal from 'sweetalert2'
import '../../Assets/css/sendDocuments.css'
import Axios from 'axios'



export default class sendDocument extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            field: [{ id: '', fieldName: '', jString: '', visible: false, required: false, values: [], fieldTypeString: '' }],
            AttachmentFile: null,
            Attachment: '',
            answers: {},
            title: '',
            description:''        }

        this.updateState = this.updateState.bind(this);

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

    updateStateFile = (event) => {
        let reader = new FileReader();
        let file = event.target.files[0]
        console.log('file', file);
        this.setState({
            //Attachment : file.name,
            AttachmentFile: file
        })
        const target = event.target;
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

        var formData = new FormData();

        let count = 0;
        for (var prop in this.state.answers) {
            formData.append('answers[' + count + '].key', prop);
            formData.append('answers[' + count + '].value', this.state.answers[prop]);
            count++
        }

        formData.append("attachmentUpload", this.state.AttachmentFile);

        console.log(formData);

        Axios({
            method: 'post',
            url: 'http://192.168.4.49:5000/api/document',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(this.AlertSucessRegister())
            .catch(function (response) {
                console.log(response)
            })
    }
    clearForm() {
        this.setState({
            id: '',
            Attachment: '',
            answers: {}
        })
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
                {/* <input placeholder="Título" required name={this.state.title} type="text" className="text" onChange={this.updateState.bind(this)} /> */}
                    {
                        this.state.field.map((document) => {
                            if (document.visible === true) {
                                if (document.fieldTypeString === "MultipleSelection") {
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
                                                                                field.values.map((value) => {
                                                                                    return (
                                                                                        <div>
                                                                                            <input id={`checkbox${index}`} value={value.valueName} name={value.valueName} type="checkbox" onChange={this.updateState}/>
                                                                                            <label htmlFor={`checkbox${index}`}>{value.valueName}</label>
                                                                                        </div>
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
                                }
                                else if (document.fieldTypeString === "List") {
                                    if (document.fieldName !== "Status") {

                                        return (
                                            <div className="inputMovel">
                                                <div>
                                                    <li className="lista">
                                                        <label>{document.fieldName}</label>
                                                        <select key={document.fieldName} select="multiple" name={document.fieldName} type={document.fieldTypeString} className="text" onChange={this.updateState}>
                                                            {
                                                                this.state.field.map((field) => {
                                                                    if (document.fieldName === field.fieldName) {
                                                                        return (
                                                                            field.values.map((value) => {
                                                                                return (
                                                                                    <option selected="selected" value={value.valueName}>{value.valueName}</option>
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
                                        <div className="inputMovel" >
                                            <div>
                                                <li className="lista">
                                                    <label>{document.fieldName}</label>
                                                    <input key={document.fieldName} required={document.required ? "required" : ""} name={document.fieldName} type={document.fieldTypeString} className="text" onChange={this.updateState} />
                                                </li>
                                            </div>
                                        </div>
                                    );
                                }
                            }
                        })
                    }
                    <input type="file" name="Attachment" multiple className="input-file" value={this.state.Attachment} onChange={this.updateStateFile} />
                    <div className="buttons">
                        <button type="reset" className="cancel">Cancelar</button>
                        <button type="submit" className="send">Enviar</button>
                    </div>
                </form>
            </div>

        )
    }

}
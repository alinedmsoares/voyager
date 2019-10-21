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
            listField: [{ id: '', fieldName: '', fieldType: '', answer:'', status: false, required: false, values: []}],
            file: '',
            // listAnswer:[{id:'', fieldName:'',answer:''}]
            
        }

        // this.updateState = this.updateState.bind(this)
        this.updateStateFile = this.updateStateFile.bind(this)
        // this.searchFields = this.searchFields.bind(this)
        // this.updateStateAwnser = this.updateStateAwnser.bind(this)


    }
    handleChange(selectorFiles) {
        console.log(selectorFiles)
    }
    // updateState(event) {
    //     this.setState({ [event.target.name]: event.target.value })
    // }
    updateStateFile(event) {
        this.setState({ file: event.target.value })
    }
    updateStateAwnser(event) {
        this.setState({ answer: event.target.value })
    }

    searchFields() {
        fetch('https://5d8289a9c9e3410014070b11.mockapi.io/document', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ listField: data }))
            .catch(error => console.log(error))
    }
    registerDocument(event) {
        event.preventDefault();
        fetch('http://5da89906e44c790014cd4f76.mockapi.io/documents', {
            method: 'POST',
            body: JSON.stringify({
                file: this.state.file,
                answer:this.state.file
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
            <div className="all">
                <Header />
                <Menu />
                <form onSubmit={this.registerDocument.bind(this)} className="form">
                    <div className="inputFixo">
                    <input placeholder="Nome do Campo*" className="nomeCampo"/>
                        <textarea placeholder="Descrição..." className="descricao"/>
                        
                    </div>
                    {
                        this.state.listField.map(function (document) {
                            return (
                                <div className="inputMovel">
                                    <div>
                                        <li className="lista">
                                            <input placeholder={document.fieldName}  type={document.fieldType} className={document.fieldType} />
                                        </li>
                                    </div>
                                </div>
                            );
                        }
                        
                        )
                    }
                    <input type="file" onChange={(e) => this.handleChange(e.target.files)} onChange={this.updateStateFile} />
                    <div className="buttons">
                        <button className="cancel">Cancelar</button>
                        <button type="submit" className="send">Cadastrar</button>
                    </div>
                </form>
            </div>

        )
    }

}
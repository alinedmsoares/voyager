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
            list: [{ id: '', FieldName: '', fieldType: '', status: false, required: false, values: [], answer:[]}],
            file: '',
            Answers:[,]            
        }

        this.updateState = this.updateState.bind(this)
        
    }
    handleChange(selectorFiles) {
        console.log(selectorFiles)
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
    registerDocument(event) {
        event.preventDefault();
        fetch('http://5da89906e44c790014cd4f76.mockapi.io/documents', {
            method: 'POST',
            body: JSON.stringify({
                file: this.state.file,
                Answers:[]
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response)
        .then(this.searchFields.bind(this))
        .catch(error => console.log(error))
        console.log(event.target.name);
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
                        this.state.list.map(function (document) {
                            return (
                                <div className="inputMovel">
                                    <div>
                                        <li className="lista">
                                            <input placeholder={document.FieldName} name={document.FieldName} type={document.fieldType} className={document.fieldType} onChange={document.updateState} />
                                        </li>
                                    </div>
                                </div>
                            );
                        }
                        
                        )
                    }
                    <input type="file" name="file" onChange={(e)  => this.handleChange(e.target.files)} onChange={this.updateState} />
                    <div className="buttons">
                        <button className="cancel">Cancelar</button>
                        <button type="submit" className="send">Cadastrar</button>
                    </div>
                </form>
            </div>

        )
    }

}
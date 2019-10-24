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
            file: '',
            answer: { title: '', description: '', fieldName: '' }
        }

        this.updateState = this.updateState.bind(this);
        this.updateStateTitle = this.updateStateTitle.bind(this);
        this.updateStateDescription = this.updateStateDescription.bind(this);
    }
    handleChange(selectorFiles) {
        console.log(selectorFiles)
    }
    updateState = (event) => {
        this.setState({
            answer: {
                [event.target.name]: event.target.value
            }
        })
        console.log(this.state)
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
            .then(data => this.setState({ field: data }))
            .catch(error => console.log(error))
    }

    registerDocument(event) {
        event.preventDefault();



        fetch('http://5d8289a9c9e3410014070b11.mockapi.io/respostaDocument', {
            method: 'POST',
            body: JSON.stringify({
                file: this.state.file,
                answer: this.state.answer
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response)
            .then(this.searchFields())
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
                        <input placeholder="Título*" value={this.state.title} onChange={this.updateState} name="title" className="nomeCampo" />
                        <textarea placeholder="Descrição*" value={this.state.description} onChange={this.updateState} name="description" className="descricao" />
                    </div>

                    {
                        this.state.field.map((document) => {
                            return (
                                <div className="inputMovel">
                                    <div>
                                        <li className="lista">
                                            <input placeholder={document.fieldName} name={document.fieldName} type={document.fieldType} className="text" onChange={this.updateState} />
                                        </li>
                                    </div>
                                </div>
                            );
                        }

                        )
                    }
                    <input type="file" name="file" className="input-file" onChange={(e) => this.handleChange(e.target.files)} />
                    <div className="buttons">
                        <button className="cancel">Cancelar</button>
                        <button type="submit" className="send">Cadastrar</button>
                    </div>
                </form>
            </div>

        )
    }

}
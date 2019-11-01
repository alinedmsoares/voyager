import React, { Component } from 'react'
import '../../Assets/css/editingViews.css'
import Menu from '../../components/menu/menu'
import Header from '../../components/header/header'
import Swal from 'sweetalert2'



export default class editingFields extends Component {

    constructor() {
        super();
        this.state = {
            id: '',
            condition: [],
            option: [],
            selected: '',
            document: [{
                field: [{ id: '', fieldName: '', fieldType: '', visible: false, required: false, values: [] }],
                answer: { title: '', description: '' }
            }],
            field: [{ id: '', fieldName: '', fieldType: '', visible: false, required: false, values: [] }],

        }
        this.onChangeFieldName = this.onChangeFieldName.bind(this)
        this.onChangeCondition = this.onChangeCondition.bind(this)
        this.onChangeAnswer = this.onChangeAnswer.bind(this)
    }
    componentDidMount() {
        this.searchFields();
        this.searchAnswers();
    }

    onChangeFieldName = (event) => {

        const fieldSelected = this.state.field.filter(Element => Element.fieldName === event.target.value)
        this.setState({
            [event.target.name]: event.target.value,
            selected: fieldSelected
        }, () => {
            console.log(this.state.selected[0].fieldType)
        })
    }
    // onChangeFieldName = (event) => {

    //     const fieldSelected = this.state.document.map(Element => Element.field.filter(Element2 => Element2.fieldName === event.target.value))
    //     console.log(event.target.value)
    //     this.setState({
    //         [event.target.name]: event.target.value,
    //         selected: fieldSelected
    //     }, () => {
    //         console.log(fieldSelected)
    //         console.log(this.state.selected[0].fieldType)
    //     })
    // }
    onChangeCondition(event) {
        this.setState({
            [event.target.name]: event.target.value,
            option: event.target.value
        }, () => {
            console.log(this.state.option)
        })
    }
    onChangeAnswer = (event) => {

        this.setState({
            answer: {
                ...this.state.answer,
                [event.target.name]: event.target.value
            }
        })
        console.log(this.state.answer)
    }

    createCondition() {
        return this.state.condition.map((el, i) =>
            <div className="general">
                <div key={i} className="itensView-extra">
                    <select className="itemExtra">
                        {
                            this.state.field.map((field) => {
                                return (
                                    <option value="">{field.fieldName}</option>
                                )
                            })
                        }
                    </select>
                    <select className="itemExtra">
                        <option value="" disabled selected>É</option>
                    </select>
                    <select className="itemExtra">
                        <option value="" disabled selected>Novo</option>
                    </select>
                </div>
                <div type='button' className="remove-value" value='remove' onClick={this.removeClick.bind(this, i)}> </div>
            </div>
        )
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
    searchAnswers() {
        fetch('https://5d8289a9c9e3410014070b11.mockapi.io/respostaDocument', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ answer: data }))
            .catch(error => console.log(error))
    }
    addClick() {
        this.setState(prevState => ({ condition: [...prevState.condition, ''] }))
    }
    removeClick(i) {
        let condition = [...this.state.condition];
        condition.splice(i, 1);
        this.setState({ condition });
    }
    render() {
        const root = this;
        return (
            <div className="all">
                <Header />
                <Menu />
                <div className="formView">
                    <div className="divTitle">
                        <label>Título da View</label>
                        <input className="viewTitle" />
                    </div>
                    <div className="conditionsView">
                        <label>Condições</label>
                        <form className="itensView">

                            <select className="item" onChange={this.onChangeFieldName.bind(this)}>
                                {
                                    this.state.field.map((fields) => {
                                        return (
                                            <option value={fields.fieldName}>{fields.fieldName}</option>)
                                    })
                                })
                            }
                            </select>
                            {/* <select className="item" onChange={this.onChangeFieldName.bind(this)}>
                                {
                                    this.state.document.map((documents) => {
                                        return (
                                            documents.field.map((fields) => {
                                                return (
                                                    <option value={fields.fieldName}>{fields.fieldName}</option>)
                                                })
                                                )
                                                
                                            })
                                        }
                            </select> */}

                            <select className="item" onChange={this.onChangeCondition.bind(this)}>
                                <option value="É">É</option>
                                <option value="Não é">Não é</option>
                                {this.state.selected.length != 0 ? this.state.selected[0].fieldType === "number" && (
                                    <option value="Maior que">Maior que</option>) : ''}
                                {this.state.selected.length != 0 ? this.state.selected[0].fieldType === "date" && (
                                    <option value="Maior que">Maior que</option>) : ''}
                                {this.state.selected.length != 0 ? this.state.selected[0].fieldType === "number" && (
                                    <option value="Maior que">Menor que</option>) : ''}
                                {this.state.selected.length != 0 ? this.state.selected[0].fieldType === "date" && (
                                    <option value="Maior que">Menor que</option>) : ''}

                            </select>

                            <select className="item" onChange={this.onChangeAnswer.bind(this)}>
                                {
                                    this.state.document.map((document) => {
                                        if (this.state.selected.length != 0) {
                                            if (this.state.selected[0].fieldName === document.answer.fieldName) {
                                                return (

                                                    <option selected="selected">{document}</option>

                                                )

                                            }
                                        }
                                    })
                                }
                            </select>
                        </form>

                        {this.createCondition()}
                        <div className="divAdd">
                            <button className="add" onClick={this.addClick.bind(this)}>Adicionar</button>
                            <button className="save">Salvar</button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
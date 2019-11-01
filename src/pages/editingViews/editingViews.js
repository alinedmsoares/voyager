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
            titleView: '',
            condition: [{option: '',}],
            column: [],
            ordenation: [],
            selected: '',
            answerFilters: [],
            document: [{
                field: [{ id: '', fieldName: '', fieldType: '', visible: false, required: false, values: [] }],
                answers: { title: '', description: '' }
            }],
            field: [{ id: '', fieldName: '', fieldType: '', visible: false, required: false, values: [] }],

        }
        this.onChangeFieldName = this.onChangeFieldName.bind(this)
        this.onChangeCondition = this.onChangeCondition.bind(this)
        this.onChangeAnswer = this.onChangeAnswer.bind(this)
        this.updateStateTitleView = this.updateStateTitleView.bind(this);
        this.updateColumn = this.updateColumn.bind(this)
    }
    componentDidMount() {
        this.searchFields();
        this.searchAnswers();
    }

    updateStateTitleView(event) {
        this.setState({ titleView: event.target.value })
    }

    updateColumn(event) {

        const field = this.state.field.filter(element => element.fieldName === event.target.value);
        const column = this.state.column;

        column.push(field);

        this.setState({ column })

        console.log(this.state)
    }

    onChangeFieldName = (event) => {

        const listFields = [];
        const fieldSelected = this.state.field.filter(Element => Element.fieldName === event.target.value)
        this.setState({
            [event.target.name]: event.target.value,
            selected: fieldSelected
        }, () => {
        })

        this.state.answers.map((answer) => {
            const fields = Object.keys(answer.answer);
            fields.map((field) => {
                if (field == event.target.value) {
                    listFields.push(answer.answer[field]);
                }
            })
        })
        const uniqueAnswers = [...new Set(listFields.map(item => item))];
        this.setState({ answerFilters: uniqueAnswers }, () => {
        });

    }

    onChangeCondition(event) {
        this.setState({
            [event.target.name]: event.target.value,
            option: event.target.value
        }, () => {
            console.log(this.state.condition.option)
        })
    }
    onChangeAnswer = (event) => {

        this.setState({
            answer: {
                ...this.state.answers,
                [event.target.name]: event.target.value
            }
        })
    }
    registerView(event) {
        event.preventDefault();
        fetch('http://5d8289a9c9e3410014070b11.mockapi.io/view', {
            method: 'POST',
            body: JSON.stringify({
                titleView: this.state.titleView,
                column: this.state.column,
                option: this.state.option
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response)

            .catch(error => console.log(error))
    }

    createCondition() {
        return this.state.condition.map((el, i) =>
            <div className="general">
                <div key={i} className="itensView-extra">
                    <select className="item" onChange={this.onChangeFieldName.bind(this)}>
                        {
                            this.state.field.map((fields) => {
                                return (
                                    <option value={fields.fieldName}>{fields.fieldName}</option>)
                            })
                        })
                    }
                            </select>


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
                            this.state.answerFilters.map((answer) => {
                                return (
                                    <option>{answer}</option>
                                )
                            })

                        })
                    {

                            this.state.field.map((field) => {
                                if (field.visible === true) {
                                    if (this.state.selected.length != 0) {
                                        if (this.state.selected[0].fieldName === field.fieldName) {
                                            return (
                                                field.values.map((values) => {
                                                    return (
                                                        <option>{values}</option>
                                                    )
                                                })
                                            )
                                        }
                                    }
                                }
                            })
                        }
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
            .then(data => this.setState({ answers: data }))
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
                        <input className="viewTitle" type="text" value={this.state.titleView} onChange={this.updateStateTitleView} />
                    </div>
                    <div className="conditionsView">
                        <label>Condições</label>
                        <form onSubmit={this.registerView.bind(this)}>

                            <select className="item" onChange={this.onChangeFieldName.bind(this)}>
                                {
                                    this.state.field.map((fields) => {
                                        return (
                                            <option value={fields.fieldName}>{fields.fieldName}</option>)
                                    })
                                })
                            }
                            </select>


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
                                    this.state.answerFilters.map((answer) => {
                                        return (
                                            <option value={answer}>{answer}</option>
                                        )
                                    })

                                })
                    {

                                    this.state.field.map((field) => {
                                        if (field.visible === true) {
                                            if (this.state.selected.length != 0) {
                                                if (this.state.selected[0].fieldName === field.fieldName) {
                                                    return (
                                                        field.values.map((values) => {
                                                            return (
                                                                <option selected="selected" value={values}>{values}</option>
                                                            )
                                                        })
                                                    )
                                                }
                                            }
                                        }
                                    })
                                }
                            </select>

                            {this.createCondition()}
                            <div>
                                <label>Colunas da Tabela</label>
                                {
                                    this.state.field.map((field) => {
                                        if (field.visible == true) {
                                            return (
                                                <label>
                                                    <input type="checkbox" value={field.fieldName} onChange={this.updateColumn.bind(this)} /> {field.fieldName}
                                                </label>
                                            )
                                        }
                                    })
                                }
                            </div>

                            <div>
                                <label>Ordenação</label>
                                <select className="item" onChange={this.onChangeFieldName.bind(this)}>
                                    {
                                        this.state.field.map((fields) => {
                                            if (fields.visible === true) {
                                                return (
                                                    <option value={fields.fieldName}> {fields.visible} {fields.fieldName}</option>
                                                )
                                            }
                                        }
                                        )
                                    }
                                </select>

                                <select className="item" onChange={this.onChangeCondition.bind(this)}>
                                    <option value="A-Z">A-Z</option>
                                    <option value="Z-A">Z-A</option>
                                    {this.state.selected.length != 0 ? this.state.selected[0].fieldType === "number" && (
                                        <option value="Crescente">Crescente</option>) : ''}
                                    {this.state.selected.length != 0 ? this.state.selected[0].fieldType === "date" && (
                                        <option value="Crescente">Crescente</option>) : ''}
                                    {this.state.selected.length != 0 ? this.state.selected[0].fieldType === "number" && (
                                        <option value="Decrescente">Decrescente</option>) : ''}
                                    {this.state.selected.length != 0 ? this.state.selected[0].fieldType === "date" && (
                                        <option value="Decrescente">Decrescente</option>) : ''}
                                </select>

                            </div>

                            <div className="divAdd">
                                <button className="add" onClick={this.addClick.bind(this)}>Adicionar</button>
                                <button className="save" type="submit">Salvar</button>
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        )
    }
}
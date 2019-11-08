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
            condition: [],
            line:[],
            column: [],
            ordenation: [],
            selected: '',
            line: [],
            answerFilters: [],
            document: [{
                field: [{ id: '', fieldName: '', fieldType: '', visible: false, required: false, values: [] }],
                answers: { title: '', description: '' }
            }],
            field: [{ id: '', fieldName: '', fieldType: '', visible: false, required: false, values: [] }],
            listaView: []
        }
        this.onChangeFieldName = this.onChangeFieldName.bind(this)
        this.onChangeCondition = this.onChangeCondition.bind(this)
        this.onChangeOption = this.onChangeOption.bind(this)
        this.onChangeAnswer = this.onChangeAnswer.bind(this)
        this.updateStateTitleView = this.updateStateTitleView.bind(this);
        this.updateColumn = this.updateColumn.bind(this)
    }

    componentDidMount() {
        this.searchFields();
        this.searchAnswers();
        this.searchViews();
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

        const condition = [];
        condition.push(event.target.value);

        this.setState({
            [event.target.name]: event.target.value,
            selected: fieldSelected,
            condition: condition
        }, () => {
            console.log(this.state)
        })

        this.state.answer.map((answer) => {
            const fields = Object.keys(answer.answer)
            console.log(fields)
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

    onChangeFieldName2 = (event) => {
        const listFields = [];
        const fieldSelected = this.state.field.filter(Element => Element.fieldName === event.target.value)
        
        const ordenation = [];
        ordenation.push(event.target.value);

        this.setState({
            [event.target.name]: event.target.value,
            selected: fieldSelected,
            ordenation : ordenation
        }, () => {
            console.log(this.state)
        })
    }

    registerView(event) {
        event.preventDefault();
        fetch('http://5d8289a9c9e3410014070b11.mockapi.io/view', {
            method: 'POST',
            body: JSON.stringify({
                titleView: this.state.titleView,
                column: this.state.column,
                condition: this.state.condition,
                ordenation: this.state.ordenation
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response)
            .then(() => {
                this.searchViews();
                this.clearForm();
            })
            .catch(error => console.log(error))
    }

    editView(event) {
        event.preventDefault();
        if (this.state.id != '') {
            fetch('https://5d8289a9c9e3410014070b11.mockapi.io/view/' + this.state.id, {
                method: 'PUT',
                body: JSON.stringify({
                    id: this.state.id,
                    titleView: this.state.titleView
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                this.setState({ id: '' })
                this.searchViews();
            })
                .catch(erro => console.log(erro))
        }
    }

    searchForId(event) {
        event.preventDefault();
        console.log('f' + event.target.getAttribute('id'));
        fetch('https://5d8289a9c9e3410014070b11.mockapi.io/view/' + event.target.getAttribute('id'), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({
                id: data.id,
                titleView: data.titleView,
                column: data.column,
                condition: data.condition,
                ordenation: data.ordenation
            }))
            .catch(erro => console.log(erro))
    }

    searchViews() {
        fetch('https://5d8289a9c9e3410014070b11.mockapi.io/view', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ listaView: data }))
            .catch(error => console.log(error))
    }

    onChangeCondition(event) {
        const condition = this.state.condition;
        condition.push(event.target.value);

        this.setState({
            [event.target.name]: event.target.value,
            option: event.target.value,
            condition : condition
        }, () => {
            console.log(this.state.condition.option)
        })
    }
    
    onChangeOption(event) {
        const ordenation = this.state.ordenation;
        ordenation.push(event.target.value);

        this.setState({
            [event.target.name]: event.target.value,
            option: event.target.value,
            ordenation : ordenation
        }, () => {
            console.log(this.state.ordenation.option)
        })
    }

    onChangeAnswer = (event) => {
        const condition = this.state.condition;
        condition.push(event.target.value);

        this.setState({
            answer: {
                ...this.state.answers,
                [event.target.name]: event.target.value,
                condition: condition
            }
        })
    }

    createCondition() {
        return this.state.line.map((el, i) =>
            <div className="general">
                <div key={i} className="itensView-extra">
                    <select className="item" name='lista_dos_campos' onChange={this.onChangeFieldName.bind(this)}>
                        {
                            this.state.field.map((fields) => {
                                return (
                                    <option value={fields.fieldName}>{fields.fieldName}</option>)
                            })
                        })
                    }
                    </select>

                    <select className="item"  name='lista_dos_campos' onChange={this.onChangeCondition.bind(this)}>
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

                    <select className="item"  name='lista_dos_campos' onChange={this.onChangeAnswer.bind(this)}>
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

    createCondition2() {
        return this.state.condition.map((el, i) =>
            <div className="general">
                <div key={i} className="itensView-extra">
                    <select className="item" name='camposlista' onChange={this.onChangeFieldName.bind(this)}>
                        {
                            this.state.field.map((fields) => {
                                return (
                                    <option value={fields.fieldName}>{fields.fieldName}</option>)
                            })
                        })
                    }
                    </select>

                    <select className="item"  name='valoreslista' onChange={this.onChangeOption.bind(this)}>
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

                </div>
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
        this.setState(prevState => ({ line: [...prevState.line, ''] }))
    }

    removeClick(i) {
        let line = [...this.state.line];
        line.splice(i, 1);
        this.setState({ line });
    }

    clearForm() {
        this.setState({
            id: '',
            titleView: '',
            condition: [],
            column: [],
            ordenation: []
        })
    }

    render() {
        const root = this;
        return (
            <div className="all">
                <Header />
                <Menu />
                <div className="formView">
                    <form onSubmit={this.registerView.bind(this)}>
                        <div className="divTitle">
                            <label>Título da View</label>
                            <input className="viewTitle" type="text" required value={this.state.titleView} onChange={this.updateStateTitleView} />
                        </div>

                        <div className="conditionsView">
                            <label className="conditionsTitle">Condições</label>
                            <div className="itensView">

                                <select className="item" name='condicional' onChange={this.onChangeFieldName.bind(this)}>
                                    {
                                        this.state.field.map((fields) => {
                                            return (
                                                <option value={fields.fieldName}>{fields.fieldName}</option>)
                                        })
                                    })
                                }
                        </select>

                               <select className="item"  name='lista_dos_campos' onChange={this.onChangeCondition.bind(this)}>
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

                                <select className="item" name='answer' onChange={this.onChangeAnswer.bind(this)}>
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
                            </div>
                            {this.createCondition()}

                            <div className="divAdd">
                                <button className="add" onClick={this.addClick.bind(this)} type="button">Adicionar</button>
                            </div>
                            <div className="columns">

                                <label className="title">Colunas da Tabela</label>
                                <div className="allCheckbox">
                                    {
                                        this.state.field.map((field, index) => {
                                            if (field.visible == true) {
                                                return (
                                                    <ul class="ks-cboxtags">
                                                        <li>
                                                            <input id={`checkbox${index}`} type="checkbox" className="checkboxOne" value={field.fieldName} onChange={this.updateColumn.bind(this)} />
                                                            <label htmlFor={`checkbox${index}`}>
                                                                <div className="checkImg"></div>
                                                                {field.fieldName}

                                                            </label>
                                                        </li>
                                                    </ul>


                                                )
                                            }
                                        })
                                    }
                                </div>
                            </div>
                    <div className="orderGeral">
                        <label>Ordenação</label>
                        <select className="item" name="camposlista" onChange={this.onChangeFieldName2.bind(this)}>
                                {
                                    this.state.field.map((fields) => {
                                        if (fields.visible === true) {
                                            return (
                                                <option value={fields.fieldName}> {fields.visible} {fields.fieldName}</option>
                                            )}
                                        }
                                    )
                                }
                        </select>
    
                        <select className="item" name="valoreslista" onChange={this.onChangeOption.bind(this)}>
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



                        </div>
                <button className="save" type="submit">Salvar</button>
                    </form>
                </div>
                <div className="listaView">
                    {
                        this.state.listaView.map((view) => {
                            return (
                                <li>
                                    <div>{view.titleView}</div>
                                    <button onClick={this.editView.bind(this)}>Editar</button>
                                </li>
                            )
                        })
                    }
                </div>
            </div >
        )
    }
}
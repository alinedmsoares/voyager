import React, { Component } from 'react'
import '../../Assets/css/editingViews.css'
import Menu from '../../components/menu/menu'
import Header from '../../components/header/header'
import Swal from 'sweetalert2'

export default class editingFields extends Component {

    constructor() {
        super();
        this.state = {

            // id: '',
            // title: '',
            condition: [],
            column: [],
            ordenation: [],
            selected: '',
            selected2: '',
            line: [],
            answerFilters: [],
            document: [{
                field: [{ id: '', fieldName: '', fieldType: '', visible: false, required: false, values: [] }],
                answers: { title: '', description: '' }
            }],
            field: [{ id: '', fieldName: '', fieldType: '', visible: false, required: false, values: [] }],
            listaUser: [{
                view: [{
                    id: '',
                    title: '',
                    condition: [],
                    column: [],
                    ordenation: [],
                }]
            }]
        }
        this.onChangeFieldName = this.onChangeFieldName.bind(this)
        this.onChangeCondition = this.onChangeCondition.bind(this)
        this.onChangeOption = this.onChangeOption.bind(this)
        this.onChangeAnswer = this.onChangeAnswer.bind(this)
        this.updateStateTitleView = this.updateStateTitleView.bind(this);
        this.updateColumn = this.updateColumn.bind(this)
        this.searchForIdView = this.searchForIdView.bind(this);
        this.deleteView = this.deleteView.bind(this);
        this.nullState = this.state
    }

    componentDidMount() {
        this.searchFields();
        this.searchAnswers();
        this.searchViews();
    }

    updateStateTitleView(event) {
        this.setState({ title: event.target.value })
    }

    updateColumn(event) {

        const field = this.state.field.filter(element => element.fieldName === event.target.value);
        const column = this.state.column;
        if (column.indexOf(event.target.value) === -1) {

            column.push(field[0].fieldName);
        } else {
            column.splice(column.indexOf(event.target.value), 1);
        }

        this.setState({ column: column })
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
        const fieldSelected2 = this.state.field.filter(Element => Element.fieldName === event.target.value)

        const ordenation = [];
        ordenation.push(event.target.value);

        this.setState({
            [event.target.name]: event.target.value,
            selected2: fieldSelected2,
            ordenation: ordenation
        }, () => {
            console.log(this.state)
        })
    }

    deleteView(event) {
        event.preventDefault();
        fetch('https://5d8289a9c9e3410014070b11.mockapi.io/view/' + event.target.getAttribute('id'), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(this.searchViews())
            .then(response => response)
    }

    searchForIdView(event, view) {
        event.preventDefault();

        this.setState({
            id: view.id,
            title: view.title,
            condition: view.condition,
            column: view.column,
            ordenation: view.ordenation
        });

        if (view.condition.length === 3) {

            let answer = '';

            this.state.field.map(e => {

                if (e.fieldName === view.condition[0]) {

                    answer = e.values.filter(element => {
                        return element !== view.condition[2];
                    })

                    answer.unshift(view.condition[2]);
                    this.setState({ answerFilters: answer })
                }
            })
        }
    }

    registerView(event) {
        event.preventDefault();

        if (this.state.id != '') {
            fetch('https://5d8289a9c9e3410014070b11.mockapi.io/view/' + this.state.id, {
                method: 'PUT',
                body: JSON.stringify({
                    id: this.state.id,
                    title: this.state.title,
                    condition: this.state.condition,
                    column: this.state.column,
                    ordenation: this.state.ordenation
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response)
                .then(() => {
                    this.setState({ id: '' })
                    this.searchViews();
                    this.clearForm();
                })
        }
        else {
            fetch('https://5d8289a9c9e3410014070b11.mockapi.io/view', {
                method: 'POST',
                body: JSON.stringify({
                    title: this.state.title,
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
    }

    searchViews() {
        fetch('http://192.168.4.49:5000/api/user/', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ listaUser: data }))
            .catch(error => console.log(error))
    }

    onChangeCondition(event) {
        const condition = this.state.condition;
        condition.push(event.target.value);

        this.setState({
            [event.target.name]: event.target.value,
            option: event.target.value,
            condition: condition
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
            ordenation: ordenation
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
                    <select className="item" name={'lista_dos_campos'} onChange={this.onChangeFieldName.bind(this)}>
                        {
                            this.state.field.map((fields) => {
                                return (
                                    <option value={fields.fieldName}>{fields.fieldName}</option>)
                            })
                        })
                    }
                    </select>

                    <select className="item" name={'lista_dos_campos'} onChange={this.onChangeCondition.bind(this)}>
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

                    <select className="item" name={'lista_dos_campos'} onChange={this.onChangeAnswer.bind(this)}>
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
                    <select className="item" name='camposlista' onChange={this.onChangeFieldName2.bind(this)}>
                        {
                            this.state.field.map((fields) => {
                                return (
                                    <option value={fields.fieldName}>{fields.fieldName}</option>)
                            })
                        })
                    }
                    </select>

                    <select className="item" name='valoreslista' onChange={this.onChangeOption.bind(this)}>
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
            title: '',
            condition: [],
            column: [],
            ordenation: []
        })
    }

    resetForm = () => {
        let colunas = this.state.column;

        this.state.column.forEach((item) => {
            this.state.column.splice(colunas.indexOf(item));
        });

        this.setState({ column: this.state.column })

        this.setState({
            id: '',
            title: '',
            condition: [],
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
                            <input className="viewTitle" type="text" required value={this.state.title || ''} onChange={this.updateStateTitleView} />
                        </div>

                        <div className="conditionsView">
                            <label className="conditionsTitle">Condições</label>
                            <div className="itensView">

                                <select className="item" name='condicional' onChange={this.onChangeFieldName.bind(this)}>
                                    {
                                        this.state.field.map((fields) => {
                                            return (
                                                <option
                                                    value={fields.fieldName}
                                                    selected={(this.state.condition[0] === fields.fieldName) ? true : false}
                                                >

                                                    {fields.fieldName}

                                                </option>
                                            )
                                        })
                                    })
                                }
                        </select>

                                <select className="item" name='lista_dos_campos' onChange={this.onChangeCondition.bind(this)}>
                                    <option selected={(this.state.condition[1] === "É") ? true : false} value="É">É</option>
                                    <option value="Não é" selected={(this.state.condition[1] === "Não é") ? true : false}>Não é</option>
                                    {this.state.selected.length != 0 ? this.state.selected[0].fieldType === "number" && (
                                        <option value="Maior que" selected={(this.state.condition[1] === "Maior que") ? true : false}>Maior que</option>) : ''}
                                    {this.state.selected.length != 0 ? this.state.selected[0].fieldType === "date" && (
                                        <option value="Maior que" selected={(this.state.condition[1] === "Maior que") ? true : false}>Maior que</option>) : ''}
                                    {this.state.selected.length != 0 ? this.state.selected[0].fieldType === "number" && (
                                        <option value="Maior que" selected={(this.state.condition[1] === "Maior que") ? true : false}>Menor que</option>) : ''}
                                    {this.state.selected.length != 0 ? this.state.selected[0].fieldType === "date" && (
                                        <option value="Maior que" selected={(this.state.condition[1] === "Maior que") ? true : false}>Menor que</option>) : ''}
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
                                                                    <option value={values}>{values}</option>
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
                        </div>

                        <div className="columns">
                            <label className="title">Colunas da Tabela</label>
                            <div className="allCheckbox">
                                <ul class="ks-cboxtags">
                                    {
                                        this.state.field.map((field, index) => {
                                            if (field.visible == true) {
                                                return (
                                                    <li>

                                                        {this.state.column.indexOf(field.fieldName) !== -1 ? (
                                                            <input
                                                                id={`checkbox${index}`}
                                                                type="checkbox"
                                                                className="checkboxOne"
                                                                value={field.fieldName}
                                                                onClick={this.updateColumn.bind(this)}
                                                                defaultChecked
                                                            />
                                                        ) : (
                                                                <div>

                                                                    <input
                                                                        id={`checkbox${index}`}
                                                                        type="checkbox"
                                                                        className="checkboxOne"
                                                                        value={field.fieldName}
                                                                        onClick={this.updateColumn.bind(this)}
                                                                    />
                                                                </div>
                                                            )}

                                                        <label htmlFor={`checkbox${index}`}>
                                                            <div className="checkImg"></div>
                                                            {field.fieldName}
                                                        </label>
                                                    </li>
                                                )
                                            }
                                        })
                                    }
                                </ul>
                            </div>
                        </div>

                        <div className="orderGeral">
                            <label>Ordenação</label>
                            <select className="item" name="camposlista" onChange={this.onChangeFieldName2.bind(this)}>
                                {
                                    this.state.field.map((fields) => {
                                        if (fields.visible === true) {
                                            return (
                                                <option value={fields.fieldName} selected={(this.state.ordenation[0] === fields.fieldName) ? true : false}> {fields.visible} {fields.fieldName}</option>
                                            )
                                        }
                                    }
                                    )
                                }
                            </select>

                            <select className="item" name="valoreslista" onChange={this.onChangeOption.bind(this)}>
                                <option value="A-Z" selected={(this.state.ordenation[1] === "A-Z") ? true : false}>A-Z</option>
                                <option value="Z-A" selected={(this.state.ordenation[1] === "Z-A") ? true : false}>Z-A</option>
                                {this.state.selected.length != 0 ? this.state.selected[0].fieldType === "number" && (
                                    <option value="Crescente" selected={(this.state.ordenation[1] === "Crescente") ? true : false}>Crescente</option>) : ''}
                                {this.state.selected.length != 0 ? this.state.selected[0].fieldType === "date" && (
                                    <option value="Crescente" selected={(this.state.ordenation[1] === "Crescente") ? true : false}>Crescente</option>) : ''}
                                {this.state.selected.length != 0 ? this.state.selected[0].fieldType === "number" && (
                                    <option value="Decrescente" selected={(this.state.ordenation[1] === "Decrescente") ? true : false}>Decrescente</option>) : ''}
                                {this.state.selected.length != 0 ? this.state.selected[0].fieldType === "date" && (
                                    <option value="Decrescente" selected={(this.state.ordenation[1] === "Decrescente") ? true : false}>Decrescente</option>) : ''}
                            </select>
                        </div>

                        <button className="save">Salvar</button>
                        <button onClick={this.resetForm} type="button">Limpar</button>

                    </form>
                </div>

                <div className="listaUser-container">
                    <div className="listaUser">
                        {
                            this.state.listaUser.map((user) => {
                                user.view.map((view) => {
                                    return (
                                        <ul>
                                            <li>
                                                <div className="listaUser-item">
                                                    {view.title}
                                                    <div className="dropdown">
                                                        <div className="dropdown-content">
                                                            <div className="dropdown-content-container">
                                                                <button className="buttonEdit" id={view.id} onClick={(event) => root.searchForIdView(event, view)}>Editar</button>
                                                                <button className="buttonDelete" id={view.id} onClick={this.deleteView.bind(this)}>Excluir</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    )
                                })
                            })
                        }
                    </div>
                </div>
            </div >
        )
    }
}
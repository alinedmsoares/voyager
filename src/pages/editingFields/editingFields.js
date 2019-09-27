import React, { Component } from 'react'
import '../../Assets/css/editingFields.css'
import Menu from '../../components/menu/menu'
import Header from '../../components/header/header'


export default class editingFields extends Component {
    // constructor responsible for setting field properties
    constructor() {
        super();
        this.state = {
            isHiddenForm: true, //form preview
            name: '', //field name
            isHiddenField: true, //field value input preview
            fieldType: '', //defined field type
            required: false, //required field
            values: [], //field value set if required
            list: [], //list with all fields registered
        }
        //field state updates
        this.updateStateFieldNameForm = this.updateStateFieldNameForm.bind(this);
        this.updateStateFieldTypeForm = this.updateStateFieldTypeForm.bind(this);
        this.updateStateRequiredForm = this.updateStateRequiredForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.searchForId = this.searchForId.bind(this);

    }
    //update name state when registering
    updateStateFieldNameForm(event) {
        this.setState({ name: event.target.value })
    }
    //update field type state when registering
    updateStateFieldTypeForm(event) {
        this.setState({ fieldType: event.target.value }, () => {
            console.log(this.state.fieldType)
        })
    }
    //update required state when registering
    updateStateRequiredForm(event) {
        this.setState({ required: event.target.value })
    }
    //update field value state when registering
    // updateStateFieldValueForm(event) {
    //     this.setState({ fieldValue: event.target.value })
    // }
    //method responsible for modifying the visibility of the submenu responsible for creating new fields
    toggleHiddenForm() {
        this.setState({
            isHiddenForm: !this.state.isHiddenForm
        })
    }
    //method responsible for viewing input value input if field type is list or multiple selection
    toggleHiddenValue(fieldType) {
        if (fieldType.target.id == "list" || fieldType.target.id == "multiple-selection") {
            this.setState({
                isHiddenField: this.state.isHiddenField = false
            })
        } else {
            this.setState({
                isHiddenField: this.state.isHiddenField = true
            })
        }

    }
    //search all fields registered
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
    // appendValue() {
    //     let newValue = `value-${this.state.fieldValue.lenght}`;
    //     this.setState(prevState => ({ fieldValue: prevState.fieldValue.concat([newValue]) }));
    // }
    componentDidMount() {
        this.searchFields();
    }

    createUI() {
        return this.state.values.map((el, i) =>
            <div key={i} className="field-value">           
                <input type="text" value={el || ''} placeholder="Valor do Campo*" onChange={this.handleChange.bind(this, i)} />
                <div type='button' value='remove' onClick={this.removeClick.bind(this, i)}> </div>
            </div>
        )
    }

    handleChange(i, event) {
        let values = [...this.state.values];
        values[i] = event.target.value;
        this.setState({ values });
    }

    addClick() {
        this.setState(prevState => ({ values: [...prevState.values, ''] }))
    }

    removeClick(i) {
        let values = [...this.state.values];
        values.splice(i, 1);
        this.setState({ values });
    }
    handleSubmit(event) {
        event.preventDefault();
    }
    //method responsible for sending the registered data to the API
    registerField(event) {
        event.preventDefault();
        fetch('https://5d8289a9c9e3410014070b11.mockapi.io/document', {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name,
                fieldType: this.state.fieldType,
                values: this.state.values,
                required: (this.state.required === 'on' ? true : false)
            }),
            headers: {

                'Content-Type': 'application/json'
            }
        })
            .then(response => response)
            .then(this.searchFields.bind(this))
            .catch(error => console.log(error))
    }
    searchForId(event){
        event.preventDefault();
        console.log('https://5d8289a9c9e3410014070b11.mockapi.io/document/' + event.target.getAttribute('id'));
        fetch('https://5d8289a9c9e3410014070b11.mockapi.io/document/' + event.target.getAttribute('id'),{
            headers:{
                'Content-Type' : 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => this.setState({ 
            name: data.name,
            fieldType: data.fieldType,
            required: data.required}))
        .catch(erro => console.log(erro))
    }

    //rendering the HTML
    render() {
        const root = this;
        return (
            <div className="fields-document">
                <Header />
                <Menu />
                {/* Button responsible for activating the visibility of the submenu */}
                {!this.state.isHiddenForm && <div className="register-fields">
                    {/* Section responsible for registering or editing a field*/}
                    <form onSubmit={this.registerField.bind(this)} className="form--add-field" >
                        <div className="close--add-field">
                            <img src="https://image.flaticon.com/icons/svg/118/118773.svg" onClick={this.toggleHiddenForm.bind(this)} />
                        </div>

                        {/*Input responsible for the name of a field*/}
                        <div className="field-name">
                            <label>Nome do Campo*</label>
                            <input type="text" value={this.state.name || ''} onChange={this.updateStateFieldNameForm} />
                        </div>

                        {/*Section responsible for selecting field types*/}
                        < section className="field-types" >
                            <label>Tipo*</label>

                            {/* Div containing each field type option */}
                            <div className="field-types--higher">
                                {/* field type:list */}
                                <div className="radio--field-types">
                                    <label for="list">
                                        <input type="radio" name="field-types"
                                            value="list" checked={this.state.fieldType === 'list'} id="list" onChange={this.updateStateFieldTypeForm} onClick={this.toggleHiddenValue.bind(this)} />
                                        <img src="https://image.flaticon.com/icons/svg/482/482559.svg" />Lista</label>

                                </div>

                                {/* field type:multiple-selection */}
                                <div className="radio--field-types">
                                    <label for="multiple-selection">
                                        <input type="radio" name="field-types"
                                            value="multiple-selection" checked={this.state.fieldType === 'multiple-selection'} id="multiple-selection" onChange={this.updateStateFieldTypeForm} onClick={this.toggleHiddenValue.bind(this)} />
                                        <img src="https://image.flaticon.com/icons/svg/2087/2087812.svg" />Seleção Múltipla</label>
                                </div>

                                {/* field type:numeric */}
                                <div className="radio--field-types">
                                    <label for="numeric">
                                        <input type="radio" name="field-types"
                                            value="numeric" checked={this.state.fieldType === 'numeric'} id="numeric" onChange={this.updateStateFieldTypeForm} onClick={this.toggleHiddenValue.bind(this)} />
                                        <img src="https://image.flaticon.com/icons/svg/56/56632.svg" />Numérico</label>
                                </div>

                            </div>

                            <div className="field-types--bottom">

                                {/* field type:text */}
                                <div className="radio--field-types">
                                    <label for="text">
                                        <input type="radio"
                                            name="field-types" value="text" checked={this.state.fieldType === 'text'} id="text" onChange={this.updateStateFieldTypeForm} onClick={this.toggleHiddenValue.bind(this)} />
                                        <img src="https://image.flaticon.com/icons/svg/2087/2087728.svg" />Texto</label>
                                </div>

                                {/* field type:date */}
                                <div className="radio--field-types">
                                    <label for="date">
                                        <input type="radio" name="field-types" value="date" checked={this.state.fieldType === 'date'} id="date" onChange={this.updateStateFieldTypeForm} onClick={this.toggleHiddenValue.bind(this)} />
                                        <img src="https://image.flaticon.com/icons/svg/481/481787.svg" />Data</label>
                                </div>

                                {/* field type:check-box */}
                                <div className="radio--field-types">
                                    <label for="check-box">
                                        <input type="radio" name="field-types" value="check-box" checked={this.state.fieldType === 'check-box'} id="check-box" onChange={this.updateStateFieldTypeForm} onClick={this.toggleHiddenValue.bind(this)} />
                                        <img src="https://image.flaticon.com/icons/svg/2089/2089626.svg" />Caixa de Seleção</label>
                                </div>
                            </div>

                        </section >
                        {/* section responsible for entering a value in the field if type list or multiple selection */}
                        {!this.state.isHiddenField &&
                            <div className="field-value">
                            <div className="field-value--container">
                                    {this.createUI()}
                            </div>
                                    <div class="add-value"onClick={this.addClick.bind(this)}></div>
                            </div>
                        }

                        {/* checkbox responsible for defining if the created field must be filled in when submitting a document */}
                        < div className="check-box--required" >
                            <input type="checkbox" onChange={this.updateStateRequiredForm} /><label>Exigir preenchimento obrigatório</label>
                        </div >
                        {/* button responsible for saving the entered data */}
                        < div className="btn--save-field" >
                            <button type="submit">Salvar</button>
                        </div >

                    </form >
                </div >}
                {/*button responsible for enabling or disabling the visibility of the field registration submenu*/}
                <div className="btn--add-new-field">
                    <button type="submit" onClick={this.toggleHiddenForm.bind(this)}>Adicionar novo campo</button>
                </div>
                {/*section containing list of existing fields*/}
                <div class="container-list">
                    <ul class="table-fields">
                        <li class="table-header">
                            <div class="header-id">Id</div>
                            <div class="header-name">Name</div>
                            <div class="header-type">Tipo</div>

                        </li>
                        {
                            this.state.list.map(function (document) {
                                return (
                                    <li class="table-row">
                                        <div class="row-id" data-label="header-id">{document.id}</div>
                                        <div class="row-name" data-label="header-name">{document.name}</div>
                                        <div class="row-type" data-label="header-type">{document.fieldType}</div>
                                        <div className="row-actions">
                                            <div class="row-edit" id={document.id} onClick={root.searchForId}></div>
                                            <div class="row-delete"></div>
                                        </div>
                                    </li>
                                );
                            })
                        }
                    </ul>

                </div>

            </div>
        )


    }
}
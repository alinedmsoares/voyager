import React, { Component } from 'react'
import '../../Assets/css/editingFields.css'
import Menu from '../../components/menu/menu'
import Header from '../../components/header/header'
import Swal from 'sweetalert2'



export default class editingFields extends Component {
    // constructor responsible for setting field properties
    constructor() {
        super();
        this.state = {
            id: '',
            isHiddenForm: true, //form preview
            fieldName: '', //field fieldName
            isHiddenField: true, //field value input preview
            fieldType: '', //defined field type
            required: false, //required field
            values: [], //field value set if required
            list: [], //list with all fields registered
            visible: true
        }

        //field state updates
        this.updateStateFieldNameForm = this.updateStateFieldNameForm.bind(this);
        this.updateStateFieldTypeForm = this.updateStateFieldTypeForm.bind(this);
        this.updateStateRequiredForm = this.updateStateRequiredForm.bind(this);
        this.searchForId = this.searchForId.bind(this);

    }

    //update fieldName state when registering
    updateStateFieldNameForm(event) {
        this.setState({ fieldName: event.target.value })
    }

    //update field type state when registering
    updateStateFieldTypeForm(event) {
        this.setState({ fieldType: event.target.value }, () => {
            console.log(this.state.fieldType)
        })
    }

    //update required state when registering
    updateStateRequiredForm(event) {
        this.setState({ required: event.target.checked })
    }

    //method responsible for modifying the visibility of the submenu responsible for creating new fields
    toggleHiddenForm() {
        this.setState({
            isHiddenForm: !this.state.isHiddenForm
        })
    }

    //method responsible for viewing input value input if field type is list or multiple selection
    toggleHiddenValue(fieldType) {
        if (fieldType.target.id === "list" || fieldType.target.id === "multiple-selection") {
            this.setState({
                isHiddenField: this.state.isHiddenField = false
            })
        } else {
            this.setState({
                isHiddenField: this.state.isHiddenField = true
            })
        }

    }
    clearForm() {
        this.setState({
            id: '',
            fieldName: '',
            fieldType: '',
            values: [],
            required: false,
            isHiddenForm: true
        })
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
    componentDidMount() {
        this.searchFields();
    }

    // method responsible for generating new inputs to add values ​​to fields
    createInput() {
        return this.state.values.map((el, i) =>
            <div key={i} className="field-value-input">
                <input type="text" required value={el || ''} placeholder="Valor do Campo*" onChange={this.handleChange.bind(this, i)} />
                <div type='button' className="remove-value" value='remove' onClick={this.removeClick.bind(this, i)}> </div>
            </div>
        )
    }

    //add entered values ​​to field
    handleChange(i, event) {
        let values = [...this.state.values];
        values[i] = event.target.value;
        this.setState({ values });
    }

    //add input by clicking the button
    addClick() {
        this.setState(prevState => ({ values: [...prevState.values, ''] }))
    }
    editVisible = (event) => {
        event.preventDefault();
        if (window.confirm("Deseja excluir esse campo?")) {
            fetch('https://5d8289a9c9e3410014070b11.mockapi.io/document/' + event.target.getAttribute('id'), {
                method: 'PUT',
                body: JSON.stringify({
                    visible: (event.target.getAttribute('visible') === 'visibleTrue' ? true : false)
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    this.searchFields()
                })
                .catch(erro => console.log(erro))
        }
    }
    //remove input by clicking the button
    removeClick(i) {
        let values = [...this.state.values];
        values.splice(i, 1);
        this.setState({ values });
    }

    //method responsible for sending the registered data to the API
    registerField(event) {
        event.preventDefault();
        if (this.state.id != '') {
            fetch('https://5d8289a9c9e3410014070b11.mockapi.io/document/' + this.state.id, {
                method: 'PUT',
                body: JSON.stringify({
                    id: this.state.id,
                    fieldName: this.state.fieldName,
                    fieldType: this.state.fieldType,
                    values: this.state.values,
                    required: this.state.required
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                this.setState({ id: '' })
                this.searchFields();
                this.clearForm();
            })
                .then(this.AlertSucessEdition())

        }
        else {
            fetch('https://5d8289a9c9e3410014070b11.mockapi.io/document', {
                method: 'POST',
                body: JSON.stringify({
                    fieldName: this.state.fieldName,
                    fieldType: this.state.fieldType,
                    values: this.state.values,
                    required: this.state.required,
                    visible: this.state.visible
                }),
                headers: {

                    'Content-Type': 'application/json'
                }
            })
                .then(this.AlertSucessRegister())
                .then(response => response)
                .then(()=>{
                    (this.searchFields())
                    (this.clearForm())
                })
                .catch(error => console.log(error))
        }
    }

    //search fields by id
    searchForId(event) {
        event.preventDefault();
        console.log('f' + event.target.getAttribute('id'));
        fetch('https://5d8289a9c9e3410014070b11.mockapi.io/document/' + event.target.getAttribute('id'), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({
                id: data.id,
                fieldName: data.fieldName,
                fieldType: data.fieldType,
                values: data.values,
                required: data.required,
                isHiddenForm: !this.state.isHiddenForm
            }))
            .catch(erro => console.log(erro))
    }

    //shows a success message when registering a new field
    AlertSucessRegister() {
        Swal.fire(
            'Campo cadastrado!',
            '',
            'success'
        )
    }
    AlertSucessEdition() {
        Swal.fire(
            'Campo editado!',
            '',
            'success'
        )
    }
    //rendering the HTML
    render() {
        const root = this;
        return (
            <div className="fields-document">

                {/* page header */}
                <Header />
                {/* menu header */}
                <Menu />

                {/* Button responsible for activating the visibility of the submenu */}
                {!this.state.isHiddenForm && <div className="register-fields">
                    {/* Section responsible for registering or editing a field*/}
                    <form onSubmit={this.registerField.bind(this)} className="form--add-field">
                        <div className="close--add-field">
                            <img src="https://image.flaticon.com/icons/svg/118/118773.svg" onClick={this.toggleHiddenForm.bind(this)} />
                        </div>

                        {/*Input responsible for the fieldName of a field*/}
                        <div className="field-name">
                            <label>Nome do Campo*</label>
                            <input required maxlength="35" type="text" value={this.state.fieldName || ''} onChange={this.updateStateFieldNameForm} />
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
                                            value="number" checked={this.state.fieldType === 'number'} id="numeric" onChange={this.updateStateFieldTypeForm} onClick={this.toggleHiddenValue.bind(this)} />
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
                                        <input type="radio" required="required" name="field-types" value="checkbox" checked={this.state.fieldType === 'checkbox'} id="check-box" onChange={this.updateStateFieldTypeForm} onClick={this.toggleHiddenValue.bind(this)} />
                                        <img src="https://image.flaticon.com/icons/svg/2089/2089626.svg" />Caixa de Seleção</label>
                                </div>
                            </div>

                        </section >

                        <div className="field-value">
                            {/* section responsible for entering a value in the field if type list or multiple selection */}
                            {!this.state.isHiddenField &&
                                <div className="field-value--container">
                                    {/* button responsible for adding a new input */}
                                    <button className="add-value" onClick={this.addClick.bind(this)}>Adicionar valor</button>
                                    {this.createInput()}
                                </div>
                            }
                            {/* checkbox responsible for defining if the created field must be filled in when submitting a document */}
                            < div className="check-box--required" >
                                <input type="checkbox" checked={this.state.required} onChange={this.updateStateRequiredForm} />
                                <label>Exigir preenchimento obrigatório</label>
                            </div >

                            {/* button responsible for saving the entered data */}
                            < div className="btn--save-field" >
                                <button type="submit">Salvar</button>
                            </div >


                        </div>

                    </form >

                </div >}
                {/*button responsible for enabling or disabling the visibility of the field registration submenu*/}
                <div className="btn--add-new-field">
                    <button type="submit" onClick={this.toggleHiddenForm.bind(this)}>Adicionar novo campo</button>
                </div>
                {/*section containing list of existing fields*/}
                <div className="container-list">
                    <ul className="table-fields">
                        <li className="table-header">
                            <div className="header-id">Id</div>
                            <div className="header-name">Nome</div>
                            <div field="header-type">Tipo</div>
                        </li>
                        <li className="table-row">
                                            <div className="row-id" data-label="header-id"></div>
                                            <div className="row-name" data-label="header-name">Título</div>
                                            <div className="requiredTrue" data-label="header-required">Obrigatório</div>
                                            <div className="row-type" data-label="header-type">text</div>
                                            <div className="row-actions">
                                                <div className="row-edit-none"></div>
                                                <div className="row-delete-none">
                                                </div>
                                            </div>
                                        </li>
                                        <li className="table-row">
                                            <div className="row-id" data-label="header-id"></div>
                                            <div className="row-name" data-label="header-name">Descrição</div>
                                            <div className="requiredTrue" data-label="header-required">Obrigatório</div>
                                            <div className="row-type" data-label="header-type">text</div>
                                            <div className="row-actions">
                                                <div className="row-edit-none"></div>
                                                <div className="row-delete-none">
                                                </div>
                                            </div>
                                        </li>


                        {
                            this.state.list.map(function (document) {
                                if (document.visible == true) {
                                    return (
                                        <li className="table-row">
                                            <div className="row-id" data-label="header-id">{document.id}</div>
                                            <div className="row-name" data-label="header-name">{document.fieldName}</div>
                                            <div className={document.required ? "requiredTrue" : "requiredFalse"} data-label="header-required">Obrigatório</div>
                                            <div className="row-type" data-label="header-type">{document.fieldType}</div>
                                            <div className="row-actions">
                                                <div className="row-edit" id={document.id} onClick={root.searchForId}></div>
                                                <div id={document.id} className="row-delete" onClick={root.editVisible}>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                }
                            })
                        }
                    </ul>

                </div>

            </div>
        )


    }
}
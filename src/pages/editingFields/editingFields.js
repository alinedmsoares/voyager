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
            fieldTypeString: '', //defined field type
            required: false, //required field
            values: [{ valueName: '' }], //field value set if required
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
        this.setState({ fieldTypeString: event.target.value }, () => {
        })
    }

    //update required state when registering
    updateStateRequiredForm(event) {
        this.setState({ required: event.target.checked })
    }

    //method responsible for modifying the visibility of the submenu responsible for creating new fields
    toggleHiddenForm() {
        this.clearForm();
        this.setState({
            isHiddenForm: !this.state.isHiddenForm
        })
    }

    //method responsible for viewing input value input if field type is list or multiple selection
    toggleHiddenValue(fieldTypeString) {
        if (fieldTypeString.target.id === "List" || fieldTypeString.target.id === "MultipleSelection") {
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
            fieldTypeString: '',
            values: [],
            required: false,
            isHiddenForm: true
        })
    }
    //search all fields registered
    searchFields() {
        fetch('http://192.168.4.49:5000/api/field', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ list: data })
            })
            .catch(error => console.log(error))
    }
    componentDidMount() {
        this.searchFields();
    }

    // method responsible for generating new inputs to add values ​​to fields
    createInput() {
        return this.state.values.map((el, i) =>
            <div key={i} className="field-value-input">
                <input type="text" required value={el.valueName || ''} placeholder="Valor do Campo *" onChange={this.handleChange.bind(this, i)} />
                <div type='button' className="remove-value" value='remove' onClick={this.removeClick.bind(this, i)}> </div>
            </div>
        )

    }

    //add entered values ​​to field
    handleChange(i, event) {
        let values = [...this.state.values];
        values[i] = {
            valueName: event.target.value
        }
        this.setState({ values });
    }

    //add input by clicking the button
    addClick() {
        this.setState(prevState => ({ values: [...prevState.values, ''] }))
    }
    editVisible = (event) => {
        event.preventDefault();
        if (window.confirm("Deseja excluir esse campo?")) {
            fetch('http://192.168.4.49:5000/api/field/visual/' + event.target.getAttribute("id"), {
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
        if (this.state.id !== '') {
            fetch('http://192.168.4.49:5000/api/field/' + this.state.id, {
                method: 'PUT',
                body: JSON.stringify({
                    id: this.state.id,
                    fieldName: this.state.fieldName,
                    fieldTypeString: this.state.fieldTypeString,
                    values: this.state.values,
                    visible: true,
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
            fetch('http://192.168.4.49:5000/api/field', {
                method: 'POST',
                body: JSON.stringify({
                    fieldName: this.state.fieldName,
                    fieldTypeString: this.state.fieldTypeString,
                    values: this.state.values,
                    required: this.state.required,
                    visible: this.state.visible
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response)
                .then(() => {
                    (this.searchFields())
                    (this.clearForm())
                })
                .then(response => {
                    if (response.status === 201) {
                        this.AlertSucessRegister()
                            (this.clearForm())
                    }
                    (this.searchFields())
                })
                .then(this.AlertSucessRegister())

                .catch(error => console.log(error))
        }
    }

    //search fields by id
    searchForId(event, data) {
        event.preventDefault();

        fetch('http://192.168.4.49:5000/api/field/' + event.target.getAttribute('id'), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({
                id: data.id,
                fieldName: data.fieldName,
                fieldTypeString: data.fieldTypeString,
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
                                    <label for="List">
                                        <input type="radio" name="field-types"
                                            value="List" checked={this.state.fieldTypeString === 'List'} id="List" onChange={this.updateStateFieldTypeForm}
                                            onClick={this.toggleHiddenValue.bind(this)}
                                        />
                                        <img src="https://image.flaticon.com/icons/svg/482/482559.svg" />Lista</label>

                                </div>

                                {/* field type:multipleselection */}
                                <div className="radio--field-types">
                                    <label for="MultipleSelection">
                                        <input type="radio" name="field-types"
                                            value="MultipleSelection" checked={this.state.fieldTypeString === 'MultipleSelection'} id="MultipleSelection" onChange={this.updateStateFieldTypeForm}
                                            onClick={this.toggleHiddenValue.bind(this)} />
                                        <img src="https://image.flaticon.com/icons/svg/2087/2087812.svg" />Seleção Múltipla</label>
                                </div>

                                {/* field type:numeric */}
                                <div className="radio--field-types">
                                    <label for="Numeric">
                                        <input type="radio" name="field-types"
                                            value="Numeric" checked={this.state.fieldTypeString === 'Numeric'} id="Numeric" onChange={this.updateStateFieldTypeForm} onClick={this.toggleHiddenValue.bind(this)} />
                                        <img src="https://image.flaticon.com/icons/svg/56/56632.svg" />Numérico</label>
                                </div>

                            </div>

                            <div className="field-types--bottom">

                                {/* field type:text */}
                                <div className="radio--field-types">
                                    <label for="Text">
                                        <input type="radio"
                                            name="field-types" value="Text" checked={this.state.fieldTypeString === 'Text'} id="Text" onChange={this.updateStateFieldTypeForm} onClick={this.toggleHiddenValue.bind(this)} />
                                        <img src="https://image.flaticon.com/icons/svg/2087/2087728.svg" />Texto</label>
                                </div>

                                {/* field type:date */}
                                <div className="radio--field-types">
                                    <label for="Date">
                                        <input type="radio" name="field-types" value="Date" checked={this.state.fieldTypeString === 'Date'} id="Date" onChange={this.updateStateFieldTypeForm} onClick={this.toggleHiddenValue.bind(this)} />
                                        <img src="https://image.flaticon.com/icons/svg/481/481787.svg" />Data</label>
                                </div>

                                {/* field type:check-box */}
                                <div className="radio--field-types">
                                    <label for="check-box">
                                        <input type="radio" required="required" name="field-types" value="CheckBox" checked={this.state.fieldTypeString === 'CheckBox'} id="check-box" onChange={this.updateStateFieldTypeForm} onClick={this.toggleHiddenValue.bind(this)} />
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
                                <input type="CheckBox" checked={this.state.required} onChange={this.updateStateRequiredForm} />
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

                        {
                            this.state.list.map(function (document) {
                                if (document.visible == true) {
                                    if (document.fieldName === "Título" || document.fieldName === "Descrição") {
                                        return (
                                            <li className="table-row" ley={document}>
                                                <div className="row-id" data-label="header-id">{document.id.slice(0, 7)}</div>
                                                <div className="row-name" data-label="header-name">{document.fieldName}</div>
                                                <div className={document.required ? "requiredTrue" : "requiredFalse"} data-label="header-required">Obrigatório</div>
                                                <div className="row-type" data-label="header-type">{document.fieldTypeString}</div>
                                                <div className="row-actions">
                                                    <div className="row-edit-none" id={document.id} ></div>
                                                    <div id={document.id} className="row-delete-none">
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    } else if (document.fieldName === "Status") {
                                        return (
                                            <li className="table-row">
                                                <div className="row-id" data-label="header-id">{document.id}</div>
                                                <div className="row-name" data-label="header-name">{document.fieldName}</div>
                                                <div className={document.required ? "requiredTrue" : "requiredFalse"} data-label="header-required">Obrigatório</div>
                                                <div className="row-type" data-label="header-type">{document.fieldTypeString}</div>
                                                <div className="row-actions">
                                                    <div className="row-edit-none" id={document.id}></div>
                                                    <div id={document.id} className="row-delete-none">
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    }
                                    return (
                                        <li className="table-row" key={document}>
                                            <div className="row-id" data-label="header-id">{document.id}</div>
                                            <div className="row-name" data-label="header-name">{document.fieldName}</div>
                                            <div className={document.required ? "requiredTrue" : "requiredFalse"} data-label="header-required">Obrigatório</div>
                                            <div className="row-type" data-label="header-type">{document.fieldTypeString}</div>
                                            <div className="row-actions">
                                                <div className="row-edit" id={document.id} onClick={(event)=>root.searchForId(event, document)}></div>
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
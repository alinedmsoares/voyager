import React, { Component } from 'react'
import '../../Assets/css/editingFields.css'
import menu from '../../components/menu/menu';


export default class editingFields extends Component {
    // constructor responsible for setting field properties
    constructor() {
        super();
        this.state = {
            isHidden: true,
            name: '',
            fieldType: '',
            request: false
        }
        this.updateStateNameForm = this.updateStateName.bind(this);
        this.updateStatusTypeFieldFormForm = this.updateStatusTypeFieldForm.bind(this);
        this.updateRequiredStatusFormForm = this.updateRequiredStatusForm.bind(this);
    }
    //update name state when registering
    updateStateName(event) {
        this.setState({ name: event.target.value })
    }
    //update type field state when registering
    updateStatusTypeFieldForm(event) {
        this.setState({ fieldType: event.target.value }, () => {
            console.log(this.state.fieldType)
        })
    }
    //update request state when registering
    updateRequiredStatusForm(event) {
        this.setState({ request: event.target.value })
    }
    //method responsible for modifying the visibility of the submenu responsible for creating new fields
    toggleHidden() {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }
    //method responsible for sending the registered data to the API
    registerField(event) {
        event.preventDefault();
        fetch('https://5d8289a9c9e3410014070b11.mockapi.io/document', {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name,
                fieldType: this.state.fieldType,
                request: (this.state.request === 'on' ? true : false)
            }),
            headers: {

                'Content-Type': 'application/json'
            }
        })
            .then(response => response)
            .then(data => {
                console.log(data);
            })
            .catch(erro => console.log(erro))
    }
    //rendering the HTML
    render() {
        return (
            <div className="fields-document">
                {/* Button responsible for activating the visibility of the submenu */}
                {!this.state.isHidden && <div className="register-fields">
                    {/* Section responsible for registering or editing a field*/}
                    <form onSubmit={this.registerField.bind(this)} className="form--add-field" >
                        <div className="close--add-field">
                            <img src="https://image.flaticon.com/icons/svg/118/118773.svg" onClick={this.toggleHidden.bind(this)}/>
                        </div>

                        {/*Input responsible for the name of a field*/}
                        < div className="field-name" >
                            <label>Nome do Campo*</label>
                            <input type="text" value={this.state.name} onChange={this.updateStateNameForm} />
                        </div>

                        {/*Section responsible for selecting field types*/}
                        < section className="field-types" >
                            <label>Tipo*</label>

                            {/* Div containing each field type option */}
                            <div className="field-types--higher">

                                <div className="radio--field-types">
                                    <label for="list">
                                        <input type="radio" name="field-types"
                                            value="list" id="list" onChange={this.updateStatusTypeFieldFormForm} />
                                        <img src="https://image.flaticon.com/icons/svg/482/482559.svg" />Lista</label>
                                </div>

                                <div className="radio--field-types">
                                    <label for="multiple-selection">
                                        <input type="radio" name="field-types"
                                            value="multiple-selection" id="multiple-selection" onChange={this.updateStatusTypeFieldFormForm} />
                                        <img src="https://image.flaticon.com/icons/svg/2087/2087812.svg" />Seleção Múltipla</label>
                                </div>

                                <div className="radio--field-types">
                                    <label for="numeric">
                                        <input type="radio" name="field-types"
                                            value="numeric" id="numeric" onChange={this.updateStatusTypeFieldFormForm} />
                                        <img src="https://image.flaticon.com/icons/svg/56/56632.svg" />Numérico</label>
                                </div>

                            </div>

                            <div className="field-types--bottom">
                                <div className="radio--field-types">
                                    <label for="text">
                                        <input type="radio"
                                            name="field-types" value="text" id="text" onChange={this.updateStatusTypeFieldFormForm} />
                                        <img src="https://image.flaticon.com/icons/svg/2087/2087728.svg" />Texto</label>
                                </div>

                                <div className="radio--field-types">
                                    <label for="date">
                                        <input type="radio" name="field-types" value="date" id="date" onChange={this.updateStatusTypeFieldFormForm} />
                                        <img src="https://image.flaticon.com/icons/svg/481/481787.svg" />Data</label>
                                </div>

                                <div className="radio--field-types">
                                    <label for="check-box">
                                        <input type="radio" name="field-types" value="check-box" id="check-box" onChange={this.updateStatusTypeFieldFormForm} />
                                        <img src="https://image.flaticon.com/icons/svg/2089/2089626.svg" />Caixa de Seleção</label>
                                </div>
                            </div>
                        </section >

                        {/* checkbox responsible for defining if the created field must be filled in when submitting a document */}
                        < div className="check-box--required" >
                              <input type="checkbox" onChange={this.updateRequiredStatusFormForm} /><label>Exigir preenchimento obrigatório</label>
                        </div >
                        {/* button responsible for saving the entered data */}
                        < div className="btn--save-field" >
                            <button type="submit">Salvar</button>
                        </div >

                    </form >
                </div >}

                <div className="btn--add-new-field">
                    <button type="submit" onClick={this.toggleHidden.bind(this)}>Adicionar novo campo</button>
                </div>
            </div>
        )


    }
}
import React, { Component } from 'react';
import '../../Assets/css/editingFields.css'
import menu from '../../components/menu/menu';

export default class editingFields extends Component {

    render() {

        return (
            <div className="fields-document__body">
                {/* Button responsible for activating the visibility of the submenu */}
                <div className="btn--add-new-field">
                    <button type="submit" onclick="myFunction()">Adicionar novo campo</button>
                    </div>
                        {/* Section responsible for registering or editing a field*/}
                        <section className="form--add-field">

                            {/*Input responsible for the name of a field*/}
                            <div className="field-name">
                            <label>Nome do Campo*</label>
                            <input type="text" />
                            </div>

                            {/*Section responsible for selecting field types*/}
                            <section className="field-types">
                                <label>Tipo*</label>

                                {/* Div containing each field type option */}
                                <div className="field-types--higher">

                                <div className="radio--field-types">
                                    <input type="radio" name="field-types"  
                                    value="list" id="list"/><label for="list">Lista</label>
                                </div>

                                <div className="radio--field-types">
                                    <input type="radio" name="field-types"
                                    value="multiple-selection" id="multiple-selection"/><label for="multiple-selection">Seleção Múltipla</label>
                                </div>

                                <div className="radio--field-types">
                                    <input type="radio" name="field-types"
                                    value="numeric" id="numeric"  /><label for="numeric">Numérico</label>
                                </div>

                                </div>

                                <div className="field-types--bottom">
                                <div className="radio--field-types">
                                    <input type="radio"
                                    name="field-types"  value="text" id="text"/><label for="text">Texto</label>
                                </div>

                                <div className="radio--field-types">
                                    <input type="radio" name="field-types"  value="date" id="date"/><label for="date">Data</label>
                                </div>

                                <div className="radio--field-types">
                                    <input type="radio" name="field-types"  value="check-box" id="check-box"/><label for="check-box">Caixa de Seleção</label>
                                </div>
                                </div>
                            </section>

                            {/* checkbox responsible for defining if the created field must be filled in when submitting a document */}
                            <div className="check-box--required">
                            <input type="checkbox" /><label>Obrigatório para enviar um document</label>
                            </div>
                            {/* button responsible for saving the entered data */}
                            <div className="btn--save-field">
                                <button type="submit">Salvar</button>
                            </div>

                        </section>

                    </div>
                    )
                }
}
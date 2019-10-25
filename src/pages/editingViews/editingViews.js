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
            field: [{ id: '', fieldName: '', fieldType: '', visible: false, required: false, values: [] }],
        }
    }
    componentDidMount() {
        this.searchFields();
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
                        <div className="itensView">
                            <select className="itemExtra">
                                {
                                    this.state.field.map((field) => {
                                        return (
                                            <option value={field.fieldName}>{field.fieldName}</option>
                                        )
                                    })
                                }
                            </select>
                            <select className="item">
                                <option value="" disabled selected>É</option>
                            </select>
                            <select className="item">
                                <option value="" disabled selected>Novo</option>
                            </select>
                        </div>
                        {this.createCondition()}
                        <div className="divAdd">
                            <button className="add" onClick={this.addClick.bind(this)}>Adicionar</button>
                            <button className="save">Salvar</button>
                        </div>
                    </div>
                </div>
                {/* <div className="listView">
                </div> */}
            </div>
        )
    }
}
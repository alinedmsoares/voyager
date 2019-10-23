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
            condition: []
        }
    }

    createCondition() {
        return this.state.condition.map((el, i) =>
            <div key={i} className="itensView">
                <select className="item">
                    <option value="" disabled selected>Status</option>
                </select>
                <select className="item">
                    <option value="" disabled selected>É</option>
                </select>
                <select className="item">
                    <option value="" disabled selected>Novo</option>
                </select>
                <div type='button' className="remove-value" value='remove' onClick={this.removeClick.bind(this, i)}> </div>
            </div>
        )
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
                    <div className="divtitulo">
                        <label>Título da View</label>
                        <input className="tituloView" />
                    </div>
                    <div className="condicoesView">
                        <label>Condições</label>
                        <div className="itensView">
                            <select className="item">
                                <option value="" disabled selected>Status</option>
                            </select>
                            <select className="item">
                                <option value="" disabled selected>É</option>
                            </select>
                            <select className="item">
                                <option value="" disabled selected>Novo</option>
                            </select>
                        </div>
                            {this.createCondition()}
                        <div className="divadd">
                            <button className="add" onClick={this.addClick.bind(this)}>Adicionar</button>
                            <button className="save">Salvar</button>
                        </div>
                    </div>
                </div>
                <div className="listView">

                </div>
            </div>
        )
    }
}
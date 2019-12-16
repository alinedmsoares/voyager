import React, { Component } from 'react';
import '../../Assets/css/listDocuments.css';
import DataTable from 'react-data-table-component';
import Menu from '../../components/menu/menu';
import Header from '../../components/header/header';
import ReactDataTablePagination from 'react-datatable-pagination'
import {Button,Input,Footer,Card,CardBody,CardImage,CardTitle,CardText} from "mdbreact";
import { tsThisType } from '@babel/types';
  

export default class listViews extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            fields: [{ id: '', fieldName: '', fieldType: '', visible: false, required: false, values: [] }],
            conditions: [],
            answers: [],
            answerFilters: [],
            order: { name: '', type: '' },
            columns: [],
            views: [],
            listaView: [],
            inputDocs: '5',
            arrayOfObjects: [{ title: 'Problemas no login', version: '0.9.1' }, { title: 'Erro no pagamento', version: '1.1.2' }, { title: 'Erro ao salvar', version: '1.1.1' }, { title: 'Problemas no aplicativo', version: '0.9.8' }, { title: 'Não consigo me logar', version: '1.5.3' }, { title: 'Problema no cadastro', version: '1.8.2' }, { title: 'Erro no login', version: '0.9.1' }, { title: 'Problemas no aplicativo', version: '1.0.0' }, { title: 'Erro no cadastro', version: '1.1.0' }, { title: 'Não consigo me cadastrar', version: '1.2.3' }],
            arrayFilter: [{ title: 'Problemas no login', version: '0.9.1' }, { title: 'Erro no pagamento', version: '1.1.2' }, { title: 'Erro ao salvar', version: '1.1.1' }, { title: 'Problemas no aplicativo', version: '0.9.8' }, { title: 'Não consigo me logar', version: '1.5.3' }, { title: 'Problema no cadastro', version: '1.8.2' }, { title: 'Erro no login', version: '0.9.1' }, { title: 'Problemas no aplicativo', version: '1.0.0' }, { title: 'Erro no cadastro', version: '1.1.0' }, { title: 'Não consigo me cadastrar', version: '1.2.3' }]
        }
        this.onChangeInput = this.onChangeInput.bind(this)
    }

    componentDidMount() {
        this.searchFields();
        this.searchAnswers();
        this.searchViews();
    }
    
    searchViews() {
        fetch('https://5d8289a9c9e3410014070b11.mockapi.io/view', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ views: data }))
            .catch(error => console.log(error))
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
    selectView = (view) => {
        this.setState({ currentView: view })

        let result = [];
        this.state.listaView.map(element => {
            if (element.titleView === this.state.currentView) {
                element.column.map(element1 => {
                    result.push({ name: element1[0].fieldName, selector: element1[0].fieldName })
                })

            }
        })
        this.setState({ currentColumns: result })

        const listFields = [];
        this.state.answer.map((answer) => {
            const fields = Object.keys(answer.answer)
            fields.map((field) => {
                listFields.push(answer.answer[field]);
            })
        })

        const uniqueAnswers = new Set(listFields.map(item => item));
        this.setState({ answerFilters: uniqueAnswers }, () => {
            uniqueAnswers.push({ uniqueAnswers: uniqueAnswers })
        });

        this.setState({ answerFilters: uniqueAnswers })
        console.log(uniqueAnswers)
    }

    handleValue = (event) =>{
        let filter = this.state.arrayOfObjects.filter(element =>{
            return element.title.toLowerCase().indexOf(event.target.value) !== -1 
        })

        this.setState({arrayFilter: filter})
    }
    onChangeInput(event){
        this.setState({ inputDocs: event.target.value })
    }
    render() {
        const columns = [
            {
                name: 'Title',
                selector: 'title',
                sortable: true,
            },
            {
                name: 'Version',
                selector: 'Version',
                sortable: true,
                right: true,
            },
        ]
        
        return (
            
            <div>     
            <input onChange={this.onChangeInput.bind(this)} value={this.state.inputDocs} placeholder="Documents por página"/> 
            
            <ReactDataTablePagination arrayOfObjects={this.state.arrayFilter} dataInOnePage={this.state.inputDocs} style="height:auto !important"/>
            
            <div class="wrap">
            <div>
                <div class="search">
                    <input type="text" class="searchTerm" placeholder="Pesquise sua View" onChange={this.handleValue} />
                    <button type="submit" class="searchButton">
                   <i class="fa fa-search"></i>
                    </button>
                </div>
            </div>
            </div>
                <div class="wrap">
            <div>
                <div class="search">
                    <input type="text" class="searchTerm" placeholder="Pesquise sua View" onChange={this.handleValue} />
                    <button type="submit" class="searchButton">
                   <i class="fa fa-search"></i>
                    </button>
                </div>
            </div>
            </div>
                

                {/* <table className="listaView">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.views.map((view, index) => {
                            return (
                                <tr key={index}>
                                    <button onClick={() => this.selectView(view.titleView)}>{view.title}</button>
                                </tr>
                            );
                        })}
                    </tbody>
                </table> */}

                {/* <DataTable
                    // title="Arnold Movies"
                    columns={this.state.currentColumns}
                    data={this.state.answerFilters}

                /> */}
            
            </div>
        )
    }
};
import React, { Component } from 'react'
import '../../Assets/css/editingViews.css'
import DataTable from 'react-data-table-component';
import Menu from '../../components/menu/menu'
import Header from '../../components/header/header'

export default class listViews extends Component {
    constructor() {
        super();
        this.state = {

            id: '',
            line: [],
            selected: '',
            line: [],
            answerFilters: [],
            document: [{
                field: [{ id: '', fieldName: '', fieldType: '', visible: false, required: false, values: [] }],
                answers: { title: '', description: '' }
            }],
            field: [{ id: '', fieldName: '', fieldType: '', visible: false, required: false, values: [] }],
            listaView: [],
            currentView: '',
            currentColumns: [],
            documentView: []
        }
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
            .then(data => this.setState({ listaView: data }))
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

        const uniqueAnswers = [...new Set(listFields.map(item => item))];
        this.setState({ answerFilters: uniqueAnswers }, () => {
            uniqueAnswers.push({ uniqueAnswers: uniqueAnswers })
        });

        this.setState({ answerFilters: uniqueAnswers })
        console.log(uniqueAnswers)
    }


    render() {
        return (
            <div>
                <div className="listaView">
                    {
                        this.state.listaView.map((view, index) => {
                            return (
                                <li key={index}>
                                    <button onClick={() => this.selectView(view.titleView)}>{view.titleView}</button>
                                </li>
                            )
                        })
                    }
                </div>
 
                <DataTable
                    title="Arnold Movies"
                    columns={this.state.currentColumns}
                    data={this.state.answerFilters}

                />
            </div>
        )
    }
};




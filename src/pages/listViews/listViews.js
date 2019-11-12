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
            titleView: '',
            condition: [],
            line: [],
            column: [],
            ordenation: [],
            selected: '',
            line: [],
            answerFilters: [],
            document: [{
                field: [{ id: '', fieldName: '', fieldType: '', visible: false, required: false, values: [] }],
                answers: {}
            }],
            field: [{ id: '', fieldName: '', fieldType: '', visible: false, required: false, values: [] }],
            listaView: [],
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
    render() {
        // const fields = this.state.field.map(field=> field.fieldName)
        // const data = [{title:fields}]

        const fields = this.state.field.map(field => field.fieldName)
        console.log(fields[1])
        const documents = this.state.document.map(documents => documents.answers)
        const data = [{ field: documents }];
        const columns = [
            {
                name: fields[1],
                selector: "field",
                sortable: true,
            },
        ];
        return (
            <DataTable
                title="Arnold Movies"
                columns={columns}
                data={data}
            />
        )
    }
};
// render() {
//     let columns = [

//         this.state.field.map((field) => {
//             return (field.fieldName)

//         })


//     ]
//     console.log(columns)
//     return (

//         // <DataTable
//         //     title={"View"}
//         //     columns={columns}
//         // />
//         <li>{columns}</li>
//     )
// }




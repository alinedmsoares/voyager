import React, { Component } from 'react'
import '../../Assets/css/documentDetails.css'
import Menu from '../../components/menu/menu'
import Header from '../../components/header/header'

export default class documentDetails extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            field: [{ id: '', fieldName: '', jString: '', visible: false, required: false, values: [], fieldTypeString: '' }],
            AttachmentFile: null,
            Attachment: '',
            answersFilters: '',
            answers: {},
            title: '',
            status: '',
            description: '',
            updates: [{ updateDescription: '', file: '', /*user: {}*/updatedatetime: '' }]
        }

        this.updateState = this.updateState.bind(this);
    }
    updateState = (event) => {
        this.setState({
            answers: {
                ...this.state.answers,
                [event.target.name]: event.target.value
            }
        })
        console.log(this.state)
    }
    componentDidMount() {
        this.searchFields();
        this.searchAnswers();
        this.searchDocumentsId();
    }
    searchFields() {
        fetch('http://localhost:5000/api/field', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ field: data })
            })
            .catch(error => console.log(error))
    }
    searchAnswers() {
        fetch('http://localhost:5000/api/document', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ searchAnswers: data }))
            .catch(error => console.log(error))
    }

    searchDocumentsId() {
        fetch('http://localhost:5000/api/document/' + this.state.id, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ documentId: data }))
            .catch(error => console.log(error))
    }


    render() {
        return (
            <section className="documentDetails">
                <Header />

                <Menu />

                <section className="content">
                    <div className="centralizer">

                        <div className="container">
                            <section className="left">
                                <div className="documentUserCentralizer">
                                    <div className="documentUser">
                                        <h1>User</h1>
                                        <div className="userEmail">
                                        </div>
                                    </div>
                                </div>

                                <div className="documentDescription">
                                    {/* Each item in documentDetail */}
                                    <div className="documentFieldCentralizer">

                                        <li classname="documentFields">
                                            <div className="fieldName">
                                                <h1>Versao</h1>
                                            </div>
                                            <div className='fieldAnswer'>
                                                <div className="answerContainer">
                                                </div>
                                            </div>
                                        </li>

                                    </div>
                                    {/*  */}

                                </div>
                            </section>
                            <section className="right">     
                                <div className="descriptionContainer">
                                    
                                    <div className="documentTitleContainer">
                                        <div className="documentTitle">
                                        <h1>Document Title</h1>
                                        </div>
                                    </div>
                                    <div className="description">

                                    </div>

                                    <div className="documentDescriptionText">
                                        
                                    </div>
                                </div>
                            </section>
                        </div>

                    </div>
                </section>
                <section className="update-section">
                    <textarea placeholder="Reply"></textarea>
                    <div className="update-list">
                    <div className="update-reply">
                    <p className="user">Space Needle</p>
                    <span>10/12/2019 13:00</span>
                    <p className="reply">Já solucionamos o erro relatado!</p>
                    </div>
                    </div>
                    </section>
            </section>
            

        )
    }

}




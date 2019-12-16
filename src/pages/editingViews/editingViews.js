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
      fields: [{ id: '', fieldName: '', fieldType: '', visible: false, required: false, values: [] }],
      conditions: [],
      conditionAnswer: [],
      answerFilters: [],
      ordination: { orderName: '', orderEnum: '' },
      selected: '',
      ConditionAnswer: '',
      columns: [],
      user: {}
    }
  }

  componentDidMount() {
    this.searchFields();
    this.searchAnswers();
    this.searchUser();
  }

  searchFields() {
    fetch('http://192.168.4.49:5000/api/field', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => this.setState({ fields: data }))
      .catch(error => console.log(error))
  }

  searchAnswers() {
    fetch('http://192.168.4.49:5000/api/document', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => this.setState({ conditionAnswer: data }))
      .catch(error => console.log(error))
  }

  searchUser() {
    fetch('http://192.168.4.49:5000/api/view/26d1947d-377d-453b-8729-bd8967227439    ', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => this.setState({ user: data }))
      .catch(error => console.log(error))
  }

  onChangeFieldName(event) {
    const listFields = [];
    let index = event.target.getAttribute('data-count');
    if (this.state.conditions[index] !== undefined) {
      this.state.conditions[index].field = event.target.value;
    } else {
      this.state.condition.push({
        field: event.target.value,
        enumCondition: '',
        ConditionAnswer: ''
      })
    }

    this.state.conditionAnswer.map((answers) => {
      const fields = Object.keys(answers.answers)
      fields.map((field) => {
        if (field === event.target.value) {
          listFields.push(answers.answers[field]);
        }
      })
    })

    const uniqueAnswers = [...new Set(listFields.map(item => item))];
    this.setState({ answerFilters: uniqueAnswers });
  }

  onChangeConditionnal(event) {
    console.log(event.target.value);
    if (
      this.state.conditions[event.target.getAttribute("data-count")] !==
      undefined
    ) {
      this.state.conditions[
        event.target.getAttribute("data-count")
      ].enumCondition = event.target.value;
    } else {
      this.state.conditions.push({
        field: "",
        enumCondition: event.target.value,
        ConditionAnswer: ""
      });
    }
  }

  onChangeAnswer(event) {
    let index = event.target.getAttribute('data-count');
    if (this.state.conditions[index] !== undefined) {
      this.state.conditions[index].ConditionAnswer = event.target.value;
    } else {
      this.state.conditions.push({
        field: '',
        enumCondition: '',
        ConditionAnswer: event.target.value
      })
    }
  }

  onChangeOrder(event) {
    this.state.ordination.orderName = event.target.value;
    this.setState({ ordination: this.state.ordination });
  }

  onChangeConditionnalOrder(event) {
    this.state.ordination.orderEnum = event.target.value;
    this.setState({ ordination: this.state.ordination });
  }

  updateColumn(event) {
    const field = this.state.fields.filter(element => element.fieldName === event.target.value);
    const columns = this.state.columns;
    if (columns.indexOf(event.target.value) === -1) {
      columns.push(field[0].fieldName);
    } else {
      columns.splice(columns.indexOf(event.target.value), 1);
    }
    this.setState({ column: columns })
  }

  addCondition() {
    console.log('add');
    this.state.conditions.push({
      field: "",
      enumCondition: "",
      ConditionAnswer: ""
    })
    this.setState({ conditions: this.state.conditions })
  }

  removeCondition(event, index) {
    this.state.conditions.splice(index, 1);

    this.setState({ conditions: this.state.conditions })
  }

  clearForm() {
    this.setState({
      id: '',
      title: '',
      conditions: [],
      columns: [],
      ordination: {}
    })
  }

  editView(event) {
    let idView = event.target.getAttribute('id');
    console.log(idView);

    let user = this.state.user;
    Object.entries(user).map(([key, value]) => {
      return (
        Object.entries(value).map(([key, view]) => {
          if (view.id === idView) {
            this.setState({
              id: view.id,
              title: view.title,
              conditions: view.conditions,
              columns: view.columns,
              ordination: view.ordination
            });
          }
        })
      )
    })
  }

  deleteView(event) {
    event.preventDefault();
    let data = {
      idUser: '26d1947d-377d-453b-8729-bd8967227439',
      idView: event.target.getAttribute('id')
    }

    fetch('http://192.168.4.49:5000/api/user', {
      method: 'DELETE',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    }
    )
      .then(this.searchUser())
      .then(console.log(data))
      .then(response => response)
  }

  listAnswers(index) {
    let listFields = [];
    let view = this.state.conditions[index];

    this.state.conditionAnswer.map(answers => {
      const fields = Object.keys(answers.answers);
      fields.map(field => {
        if (field === view.field) {
          listFields.push(answers.answers[field]);
        }
      });
    });

    const uniqueAnswers = [...new Set(listFields.map(item => item))];
    return uniqueAnswers;
  }

  onSubmit(event) {
    event.preventDefault();

    let data = {
      title: this.state.title,
      conditions: this.state.conditions,
      columns: this.state.columns,
      ordination: this.state.ordination
    };

    let url = "http://192.168.4.49:5000/api/user/view/26d1947d-377d-453b-8729-bd8967227439";
    let method = "POST";

    if (this.state.id !== "") {
      data.id = this.state.id;
      url += this.state.id;
      method = "Put";
    }

    console.log(JSON.stringify(data));

    fetch(url, {
      method: method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response)
      .then(() => {
        this.setState({ id: "" });
        this.searchUser();
        this.clearForm();
        this.AlertSucessRegister();
      });
  }

  resetForm = () => {
    this.setState({
      id: '',
      title: '',
      conditions: [],
      columns: [],
      ordination: {}
    })
  }
  AlertSucessRegister() {
    Swal.fire(
      'View cadastrada!',
      '',
      'success'
    )
  }
  render() {
    return (
      <div className="all">
        <Header />
        <Menu />
        <div className="container">
          <h2>Edit Views</h2>
          <div className="formView">
            <form onSubmit={this.onSubmit.bind(this)}>
              <div className="divTitle">
                <label htmlFor="exampleInputEmail1">Title</label>
                <input
                  type="titulo"
                  className="title-input"
                  id="inputTitulo"
                  aria-describedby="tituloHelp"
                  required
                  value={this.state.title}
                  onChange={(e) => this.setState({ title: e.target.value })}
                />
              </div>
              <table className="conditionsView">
                <div className="itensView-title">
                  <p className="conditionsTitle">Conditions</p>
                </div>
                <div className="itensView-container">
                  {this.state.conditions.map((item, index) => {
                    return (
                      <div className="itensView">
                        <li className="itensView-tr" key={index}>

                          <select
                            className="item"
                            name={"field"}
                            defaultValue={item.field}
                            data-count={index}
                            onChange={this.onChangeFieldName.bind(this)}
                          >
                            <option value="">Select</option>
                            {this.state.fields.map((field, index) => {
                              return (
                                <option key={index} value={field.fieldName}>
                                  {field.fieldName}
                                </option>
                              );
                            })}
                            ) }
                          </select>

                          <select
                            className="item"
                            name={"condition"}
                            defaultValue={item.enumCondition}
                            data-count={index}
                            onChange={this.onChangeConditionnal.bind(this)}
                            disabled={
                              this.state.conditions[index].field === ""
                                ? "none"
                                : ""
                            }
                          >
                            <option value="">Select</option>
                            <option value="Is" selected={(this.state.conditions[1] === "Is") ? true : false}>Is</option>
                            <option value="IsNot" selected={(this.state.conditions[1] === "IsNot") ? true : false}>IsNot</option>
                            {this.state.selected.length !== 0 ? this.state.selected[0].fieldType === "number" && (
                              <option value="Bigger" >Bigger</option>) : ''}
                            {this.state.selected.length !== 0 ? this.state.selected[0].fieldType === "date" && (
                              <option value="Bigger">Bigger</option>) : ''}
                            {this.state.selected.length !== 0 ? this.state.selected[0].fieldType === "number" && (
                              <option value="Smaller">Smaller</option>) : ''}
                            {this.state.selected.length !== 0 ? this.state.selected[0].fieldType === "date" && (
                              <option value="Smaller">Smaller</option>) : ''}
                          </select>

                          <select
                            className="item"
                            name={"answers"}
                            defaultValue={item.answers}
                            data-count={index}
                            onChange={this.onChangeAnswer.bind(this)}
                            disabled={item.field === "" ? "none" : ""}
                          >
                            <option value="">Select</option>
                            {this.listAnswers(index).map((answers, index) => {
                              return <option key={index}>{answers}</option>;
                            })}
                            )
                          </select>

                        </li>
                        <div
                          className="remove-value-condition"
                          onClick={this.removeCondition.bind(this, index)}
                          type="button"
                        >
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="button-div">
                  <button
                    className="add"
                    onClick={this.addCondition.bind(this)}
                    type="button"
                  >
                    Add
                      </button>
                </div>
              </table>
              <div className="columns">
                <label className="title">Table Columns</label>
                <div className="allCheckbox">
                  <ul className="ks-cboxtags">
                    {this.state.fields.map((field, index) => {
                      if (field.visible === true) {
                        return (
                          <li key={index}>
                            {this.state.columns.indexOf(field.fieldName) !== -1 ? (
                              <input
                                id={`checkbox${index}`}
                                type="checkbox"
                                className="checkboxOne"
                                value={field.fieldName}
                                onClick={this.updateColumn.bind(this)}
                                defaultChecked
                              />
                            ) : (
                                <div>
                                  <input
                                    id={`checkbox${index}`}
                                    type="checkbox"
                                    className="checkboxOne"
                                    value={field.fieldName}
                                    onClick={this.updateColumn.bind(this)}
                                  />
                                </div>
                              )}

                            <label htmlFor={`checkbox${index}`}>
                              <div className="checkImg"></div>
                              {field.fieldName}
                            </label>
                          </li>
                        );
                      }
                    })}
                  </ul>
                </div>
              </div>

              <div className="orderGeral">
                <div className="orderGeral-title">
                  <label htmlFor="">Order</label>
                </div>

                <div className="order-select-geral">
                  <div className="order-select">
                    <select
                      className="item"
                      name={"field"}
                      defaultValue={this.state.ordination.orderName}
                      onChange={this.onChangeOrder.bind(this)}
                    >
                      <option value="">Select</option>
                      {this.state.fields.map((field, index) => {
                        return (
                          <option key={index} value={field.fieldName}>
                            {field.fieldName}
                          </option>
                        );

                      })}
                    </select>


                    <select
                      className="item"
                      name={"condition"}
                      defaultValue={this.state.ordination.type}
                      onChange={this.onChangeConditionnalOrder.bind(this)}
                      disabled={
                        this.state.ordination.orderName === ""
                          ? "none"
                          : ""
                      }
                      name="valoreslista"
                    >
                      <option value="">Select</option>
                      <option value="AZ" selected={(this.state.ordination[1] === "AZ") ? true : false}>A-Z</option>
                      <option value="ZA" selected={(this.state.ordination[1] === "ZA") ? true : false}>Z-A</option>
                      {this.state.selected.length !== 0 ? this.state.selected[0].fieldType === "number" && (
                        <option value="Crescent" selected={(this.state.ordination[1] === "Crescent") ? true : false}>Crescent</option>) : ''}
                      {this.state.selected.length !== 0 ? this.state.selected[0].fieldType === "date" && (
                        <option value="Crescent" selected={(this.state.ordination[1] === "Crescent") ? true : false}>Crescent</option>) : ''}
                      {this.state.selected.length !== 0 ? this.state.selected[0].fieldType === "number" && (
                        <option value="Descending" selected={(this.state.ordination[1] === "Descending") ? true : false}>Descending</option>) : ''}
                      {this.state.selected.length !== 0 ? this.state.selected[0].fieldType === "date" && (
                        <option value="Descending" selected={(this.state.ordination[1] === "Descending") ? true : false}>Descending</option>) : ''}
                    </select>

                  </div>

                </div>
              </div>

              <div className="clear-save-buttons">
              <div className="buttons-geral">
                              <button type="submit" className="save">
                  Save
              </button>
                <button onClick={this.resetForm} type="button" className="clear-button">Cancel</button>
              </div>
              </div>
            </form>
          </div>

          <div className="listView-container">
            <div className="listView">
              {
                Object.entries(this.state.user).map(([key, value1]) => {
                  return (
                    // console.log(value[0])
                    Object.entries(value1).map(([key1, view]) => {
                      if (view.title !== undefined) {
                        return (
                          <ul>
                            <li>
                              <div className="listView-item">
                                <p>{view.title}</p>
                                <div className="dropdown">
                                  <div className="dropdown-content">
                                    <div className="dropdown-content-container">
                                      <button className="buttonEdit" id={view.id} onClick={this.editView.bind(this)}>Edit</button>
                                      <button className="buttonDelete" id={view.id} onClick={this.deleteView.bind(this)}>Delete</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                            
                          </ul>
                        )
                      }
                    })
                  )
                })
              }

            </div>
          </div>
        </div>
      </div>
    );
  }
}
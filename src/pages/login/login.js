import React, { Component } from 'react';
import Axios from "axios";
import { parseJwt } from '../../services/auth';
import swal from 'sweetalert2'
import '../../Assets/css/login.css'

export default class editingFields extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
        }
    }
    atualizaEstadoEmail(event) {
        this.setState({ email: event.target.value });
    }

    atualizaEstadoSenha(event) {
        this.setState({ password: event.target.value });
    }
    AlertError() {
        swal.fire({
            position: 'center-center',
            type: 'error',
            title: 'Email ou senha incorretos',
            showConfirmButton: false,
            timer: 1500
        })
    }
    efetuaLogin(event) {
        event.preventDefault();

        Axios.post('http://192.168.4.49:5000/api/login', {
            email: this.state.email,
        })
            .then(data => {
                if (data.status === 200) {
                    localStorage.setItem("user-voyager", data.data.token);
                    this.props.history.push("/senddocuments")
                }
            })
            .catch(erro => {
                this.AlertError();
                console.log(erro);
            })
    }
    render() {
        return (
            <div>
                <form action="" onSubmit={this.efetuaLogin.bind(this)} className="log-in" autocomplete="off">
                    <div className="floating-label">
                    <label for="email">Email:</label>
                        <input placeholder="Email" type="text" name="email" id="email" value={this.state.email} onChange={this.atualizaEstadoEmail.bind(this)}
                            autocomplete="off" />
                    </div>
                    <button type="submit" onClick="return false;">Log in</button>

                </form>
            </div>
        )
    }
}
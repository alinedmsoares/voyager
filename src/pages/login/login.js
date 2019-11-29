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
            password: ''
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

        Axios.post('http://5d8289a9c9e3410014070b11.mockapi.io/externalusers', {
            email: this.state.email,
            password: this.state.password
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

            <form action="" onSubmit={this.efetuaLogin.bind(this)} className="log-in" autocomplete="off">
                <div className="floating-label">
                    <input placeholder="Email" type="text" name="email" id="email" value={this.state.email} onChange={this.atualizaEstadoEmail.bind(this)}
                        autocomplete="off"/>
                        <label for="email">Email:</label>
</div>
                    <div className="floating-label">
                        <input placeholder="Password" type="password" value={this.state.password}
                            onChange={this.atualizaEstadoSenha.bind(this)} name="password" id="password" autocomplete="off"/>
                            <label for="password">Password:</label>
</div>
                        <button type="submit" onClick="return false;">Log in</button>

</form>
                    )
                }
}
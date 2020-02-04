import React, { Component } from 'react';
import {connect} from "react-redux";
import{loginUser} from '../../actions/user_actions'

class RegisterLogin extends Component {

    state = {
        email : "",
        password : "",
        errors : []
    };

    displayErrors = errors => {
        console.log(errors)
        errors.map((error, i) => <p key={i}>{error}</p>)
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    submitForm = event => {
        event.preventDefault();
        let data = {
            email: this.state.email,
            password: this.state.password
        }

        if(this.isFormvalid(this.state)){
            this.setState({errors:[]})
            this.props.dispatch(loginUser(data))
            .then(response => {
                if(response.payload.loginSuccess){
                    this.props.history.push('/')
                }else{
                    this.setState({
                        errors: this.state.errors.concat("Email Id or password doesn't exist")
                    })
                }
            })
        } else {
            this.setState({
                errors: this.state.errors.concat("Invalid Form")
            })
        }
    }

    //const email = this.state.email and const {email} = this.state are both the same.
    // check whether we have both the values or not.
    isFormvalid = ({email, password}) => email && password;


    render() {
        return (
            <div className = "container">
                <h2>Login</h2>
                <div className= "row">
                    <form className="col s12" >
                        <div className = "row">
                        <div className = "input-field col s12 ">
                            <input name="email"
                            value ={this.state.email}
                            onChange ={e => this.handleChange(e)}
                            id = "email"
                            type = "email"
                            className = "validate"
                            />
                            <label htmlFor="email">Email</label>
                            <span
                                className ="helper-text"
                                data-error = "Incorrect email id"
                                data-success = "correct mail id provided"
                            />
                        </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <input name="password"
                            value ={this.state.password}
                            onChange ={e => this.handleChange(e)}
                            id = "password"
                            type = "password"
                            className = "validate"
                            />
                            <label htmlFor ="password">Password</label>
                            <span
                                className ="helper-text"
                                data-error = "Incorrect password"
                                data-success = "correct password"
                            />
                            </div>
                        </div>

                        {this.state.errors.length > 0 && (
                            <div>
                                {this.displayErrors(this.state.errors)}
                                <ul>{this.state.errors}</ul>
                            </div>
                        )}

                        <div className="row">
                            <div className = "col 12">
                            <button 
                            className ="btn waves-effect red lighten-2"
                            type="submit"
                            name="action"
                            onClick={this.submitForm}
                            >
                            Login
                            </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStatetoProps(state){
    return {
        user:state.user
    }
}

export default connect(mapStatetoProps)(RegisterLogin);
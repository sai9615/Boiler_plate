import React, { Component } from 'react';
import {connect} from "react-redux";
import{registerUser} from '../../actions/user_actions';

class register extends Component {
    state = {
        firstname: "",
        lastname: "",
        email : "",
        password : "",
        repassword:"",
        errors : []
    };

    displayErrors = errors => {
       // console.log(errors)
        errors.map((error, i) => <p key={i}>{error}</p>)
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    isFormValid = () => {
       let errors = [];
       let error;

       if(this.isFormEmpty(this.state)){
           errors = {info: "fill in all the fields"};
           this.setState({errors: errors.concat(error)})
       } else if (!this.passwordCheck(this.state)){
        errors = {info: "incorrect password"};
        this.setState({errors: errors.concat(error)})
       } else {
        return true;
       }

    }

    isFormEmpty = ({ lastname, firstname, email, password, repassword}) => {
        return (
            !lastname.length ||
            !firstname.length ||
            !email.length ||
            !password.length ||
            !repassword.length
        );
       }

       passwordCheck = ({password, repassword}) => {
           if (password.length < 6 || repassword.length < 6){
               return false;
           } else if (password !== repassword){
               return false;
           } else {
               return true;
           }
       }


    submitForm = event => {
        event.preventDefault();
        let data = {
            name: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password,
        }

        if(this.isFormValid(this.state)){
            this.setState({errors:[]})
            this.props.dispatch(registerUser(data))
            .then(response => {
                if(response.payload.success){
                    this.props.history.push('/login')
                } else {
                    this.setState({
                        errors: this.state.errors.concat("Invalid fields, please fill again")
                    })
                } 
            })
        } else {
            this.setState({
                errors: this.state.errors.concat("Invalid Form")
            })
        }
    }

    render() {
        return (
            <div className = "container">
                <h2>Sign Up</h2>
                <div className= "row">
                    <form className="col s12" >
                        <div className = "row">
                        <div className = "input-field col s12 ">
                            <input name="firstname"
                           value ={this.state.firstname}
                           onChange ={e => this.handleChange(e)}
                            id = "firstname"
                            type = "text"
                            class = "validate"
                            />
                            <label class="active" for="firstname">First Name</label>
                            <span
                                class = "helper-text"
                                data-error = "Incorrect first name"
                                data-success = "correct"
                            />
                        </div>
                        </div>
                        <div className = "row">
                        <div className = "input-field col s12 ">
                            <input name="lastname"
                           value ={this.state.lastname}
                           onChange ={e => this.handleChange(e)}
                            id = "lastname"
                            type = "text"
                            class = "validate"
                            />
                            <label class="active" for="lastname">Last Name</label>
                            <span
                                class = "helper-text"
                                data-error = "Incorrect last name"
                                data-success = "correct"
                            />
                        </div>
                        </div>

                        <div className = "row">
                        <div className = "input-field col s12 ">
                            <input name="email"
                           value ={this.state.email}
                           onChange ={e => this.handleChange(e)}
                            id = "email"
                            type = "email"
                            class = "validate"
                            />
                            <label class="active" for="email">Email</label>
                            <span
                                class = "helper-text"
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
                            class = "validate"
                            />
                            <label class="active" htmlFor ="password">Password</label>
                            <span
                                className ="helper-text"
                                data-error = "Incorrect password"
                                data-success = "correct password"
                            />
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                            <input name="repassword"
                            value ={this.state.repassword}
                            onChange ={e => this.handleChange(e)}
                            id = "repassword"
                            type = "password"
                            class = "validate"
                            />
                            <label class="active" htmlFor ="repassword">Re-enter Password</label>
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
                            className ="btn waves-effect red waves-light"
                            type="submit"
                            name="action"
                            onClick={this.submitForm}
                            >
                            Sign Up
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

export default connect(mapStatetoProps)(register);
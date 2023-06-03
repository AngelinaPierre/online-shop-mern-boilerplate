import React, { Component } from 'react'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/user_actions';

class Register extends Component {

    state = {
        name: "",
        lastname: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        errors: []
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    displayErrors = errors => errors.map((err, i) => <p key={i}>{err.message}</p>)

    isPasswordValid = ({ password, passwordConfirmation }) => {
        if (password.length < 6 || passwordConfirmation.length < 6) {
            return false;
        } else if (password !== passwordConfirmation) {
            return false;
        } else {
            return true;
        }
    }

    isFormEmpty = ({ name, lastname, email, password, passwordConfirmation }) => {
        return (
            !name.length ||
            !lastname.length ||
            !email.length ||
            !password.length ||
            !passwordConfirmation.length
        )
    }
    isFormValid = () => {
        let errors = [];
        let error;

        if (this.isFormEmpty(this.state)) {
            error = { message: "Fill in all fields!" }
            this.setState({ errors: errors.concat(error) })
        } else if (!this.isPasswordValid(this.state)) {
            error = { message: "Password is invalid!" }
            this.setState({ errors: errors.concat(error) })
        } else {
            return true
        }
    }

    submitForm = evt => {
        evt.preventDefault();

        let dataToSubmit = {
            name: this.state.name,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password,
            passwordConfirmation: this.state.passwordConfirmation
        }

        if (this.isFormValid()) {
            this.setState({ errors: [] })
            this.props.dispatch(registerUser(dataToSubmit))
                .then(resp => {
                    if (resp.payload.success) {
                        this.props.history.push('/login')
                    } else {
                        this.setState({
                            errors: this.state.errors.concat(
                                "Failed to send DATA to DB"
                            )
                        })
                    }
                }).catch(err => {
                    this.setState({ errors: this.state.errors.concat(err) })
                })
        } else {
            console.error("Form is not valid")
        }
    }

    render() {
        return (
            <div className='container'>
                <h2> Register</h2>
                <div className='row'>
                    <form action="" className='col s12' onSubmit={evt => this.submitForm(evt)}>
                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    id='name'
                                    name='name'
                                    className='validate'
                                    value={this.state.name}
                                    onChange={evt => this.handleChange(evt)}
                                />
                                <label htmlFor="name" className='active'>name</label>
                                <span
                                    className='helper-text'
                                    data-error="wrong"
                                    data-success="right"
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    id='lastname'
                                    className='validate'
                                    name='lastname'
                                    value={this.state.lastname}
                                    onChange={evt => this.handleChange(evt)}
                                />
                                <label htmlFor="lastname" className='active'>lastname</label>
                                <span
                                    className='helper-text'
                                    data-error="Type a right type email"
                                    data-success="right"
                                />
                            </div>
                        </div>


                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    id='email'
                                    name='email'
                                    className='validate'
                                    value={this.state.email}
                                    onChange={evt => this.handleChange(evt)}
                                />
                                <label htmlFor="email" className='active'>email</label>
                                <span
                                    className='helper-text'
                                    data-error="wrong"
                                    data-success="right"
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    id='password'
                                    name='password'
                                    className='validate'
                                    value={this.state.password}
                                    onChange={evt => this.handleChange(evt)}
                                    type='password'
                                />
                                <label htmlFor="password" className='active'>password</label>
                                <span
                                    className='helper-text'
                                    data-error="wrong"
                                    data-success="right"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    id='passwordConfirmation'
                                    name='passwordConfirmation'
                                    className='validate'
                                    value={this.state.passwordConfirmation}
                                    onChange={evt => this.handleChange(evt)}
                                    type='password'
                                />
                                <label htmlFor="passwordConfirmation" className='active'>Password Confirmation</label>
                                <span
                                    className='helper-text'
                                    data-error="wrong"
                                    data-success="right"
                                />
                            </div>
                        </div>

                        {this.state.errors.length > 0 && (
                            <div className='row'>
                                {
                                    this.displayErrors(this.state.errors)
                                }
                            </div>
                        )}


                        <div className="row">
                            <div className="col 12">
                                <button
                                    className='btn waves-effect red lighten-2'
                                    type='submit'
                                    name='action'
                                    onClick={evt => this.submitForm}
                                >Create account</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Register)
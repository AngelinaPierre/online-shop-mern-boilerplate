import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loginUser } from '../../actions/user_actions';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class Login extends Component {

    state = {
        email: "",
        password: "",
        errors: []
    };

    displayErrors = errors => errors.map((err, i) => <p key={i}>{err}</p>)

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    submitForm = evt => {
        evt.preventDefault();

        let dataToSubmit = {
            email: this.state.email,
            password: this.state.password
        };

        // validation
        if (this.isFormvalid(this.state)) {
            this.setState({
                errors: []
            });
            this.props.dispatch(loginUser(dataToSubmit))
                .then(resp => {
                    if (resp.payload.loginSuccess) {
                        this.props.history.push('/about')
                    } else {
                        this.setState({
                            errors: this.state.errors.concat(
                                "Failed to log in, you can check your Email and Password"
                            )
                        })
                    }
                })
        } else {
            this.setState({
                errors: this.state.errors.concat("Form is not valid")
            })
        }
    }

    isFormvalid = ({ email, password }) => email && password;


    render() {
        return (
            <div className='container'>
                <h2> Login</h2>
                <div className='row'>
                    <form action="" className='col s12' onSubmit={evt => this.submitForm(evt)}>
                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    id='email'
                                    className='validate'
                                    name='email'
                                    value={this.state.email}
                                    onChange={evt => this.handleChange(evt)}
                                />
                                <label htmlFor="email" className='active'>Email</label>
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
                                    id='password'
                                    name='password'
                                    className='validate'
                                    value={this.state.password}
                                    onChange={evt => this.handleChange(evt)}
                                    type='password'
                                />
                                <label htmlFor="password">Password</label>
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
                                >Login</button>

                                &nbsp;&nbsp;

                                <Link to='/register'>
                                    <button
                                        className='btn waves-effect red lighten-2'
                                        type='submit'
                                        name='action'
                                    >Sign up</button>
                                </Link>
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

export default connect(mapStateToProps)(Login)
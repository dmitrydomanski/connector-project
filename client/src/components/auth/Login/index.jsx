import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser } from '../../../actions/authActions';
import TextFieldGroup from '../../common/TextFieldGroup';
import isEmpty from '../../../validation/is-empty';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {
            },
        };
    }

    componentDidMount() {
        const { auth, history } = this.props;
        if (auth.isAuthenticated) {
            history.push('/dashboard');
        }
    }

    static getDerivedStateFromProps(props) {
        const { auth, err, history } = props;
        if (auth.isAuthenticated) {
            history.push('/dashboard');
        }
        if (!isEmpty(err)) {
            return {
                errors: err,
            };
        }
        return null;
    }

    onLogin = (userData) => {
        const { onLogin } = this.props;
        onLogin(userData);
    }

    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    }

    onSubmit = (e) => {
        const { email, password } = this.state;
        e.preventDefault();
        const userData = {
            email,
            password,
        };

        this.onLogin(userData);
    }

    render() {
        const { email, password, errors } = this.state;
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">
                                Sign in to your DevConnector account
                            </p>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    type="email"
                                    placeholder="Email Address"
                                    name="email"
                                    value={email}
                                    onChange={this.onChange}
                                    error={errors.email}
                                />

                                <TextFieldGroup
                                    type="password"
                                    placeholder="Your password"
                                    name="password"
                                    value={password}
                                    onChange={this.onChange}
                                    error={errors.password}
                                />

                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    err: state.err,
});

const mapActionsToProps = dispatch => bindActionCreators({
    onLogin: loginUser,
}, dispatch);

Login.propTypes = {
    onLogin: PropTypes.func.isRequired,
    history: PropTypes.instanceOf(Object).isRequired,
    auth: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(Login);

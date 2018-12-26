import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { registerUser } from '../../../actions/authActions';
import TextFieldGroup from '../../common/TextFieldGroup';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.err) {
            this.setState({
                errors: nextProps.err,
            });
        }
    }

    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    }

    onSubmit = (e) => {
        const { name, email, password, password2 } = this.state;
        const { history } = this.props;
        e.preventDefault();

        const newUser = {
            name,
            email,
            password,
            password2,
        };

        /* eslint react/destructuring-assignment: */
        this.props.registerUser(newUser, history);
    }

    render() {
        const { name, email, password, password2, errors } = this.state;
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">
                                Create your DevConnector account
                            </p>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    value={name}
                                    onChange={this.onChange}
                                    error={errors.name}
                                />

                                <TextFieldGroup
                                    type="email"
                                    placeholder="Email Address"
                                    name="email"
                                    value={email}
                                    onChange={this.onChange}
                                    info="This site uses Gravatar, so if you
                                    want a profile image, use a Gravatar email"
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

                                <TextFieldGroup
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="password2"
                                    value={password2}
                                    onChange={this.onChange}
                                    error={errors.password2}
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

export default connect(mapStateToProps, {
    registerUser,
})(withRouter(Register));

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    err: PropTypes.instanceOf(Object).isRequired,
    history: PropTypes.instanceOf(Object).isRequired,
    auth: PropTypes.instanceOf(Object).isRequired,
};

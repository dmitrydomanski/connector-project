import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {
    componentDidMount() {
        const { auth, history } = this.props;
        if (auth.isAuthenticated) {
            history.push('/dashboard');
        }
    }

    render() {
        return (
            <div className="landing">
                <div className="dark-overlay landing-inner text-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h1 className="display-3 mb-4">Developer Connector</h1>
                                <p className="lead">
                                    {' '}
                                    Create a developer profile/portfolio, share posts and get help
                                    from other developers
                                </p>
                                <hr />
                                <Link className="btn btn-lg btn-info mr-2" to="/register">
                                    Sign Up
                                </Link>
                                <Link className="btn btn-lg btn-light" to="/login">
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
});

Landing.propTypes = {
    history: PropTypes.instanceOf(Object).isRequired,
    auth: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps)(Landing);

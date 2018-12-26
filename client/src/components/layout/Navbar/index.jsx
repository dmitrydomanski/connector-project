import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authActions';
import { clearCurrentProfile } from '../../../actions/profileActions';


class NavBar extends Component {
    onLogoutClick = (event) => {
        event.preventDefault();
        /* eslint react/destructuring-assignment: */
        this.props.logoutUser();
        // this.props.clearCurrentProfile();
    };

    render() {
        const { auth } = this.props;
        const { isAuthenticated, user } = auth;

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item d-inline-flex">
                    <Link className="nav-link" to="/dashboard">
                        Dashboard
                    </Link>
                    <button type="button" className="btn btn-link" onClick={this.onLogoutClick}>
                        <img
                            className="rounded-circle"
                            src={user.avatar}
                            style={{
                                width: '25px',
                                marginRight: '5px',
                            }}
                            alt={user.name}
                        />
                        Logout
                    </button>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">
                        Sign Up
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                </li>
            </ul>
        );

        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        DevConnector
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#mobile-nav"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/profiles">
                                    {' '}
                                    Developers
                                </Link>
                            </li>
                        </ul>

                        {isAuthenticated ? authLinks : guestLinks}
                    </div>
                </div>
            </nav>
        );
    }
}

NavBar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    // clearCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {
    logoutUser,
    clearCurrentProfile,
})(NavBar);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

/* eslint no-confusing-arrow: */
/* eslint indent: */
/* eslint react/jsx-indent: */

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props => auth.isAuthenticated ? (
            <Component {...props} />
        ) : (
                <Redirect to="/login" />
            )}
    />
);

PrivateRoute.propTypes = {
    auth: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);

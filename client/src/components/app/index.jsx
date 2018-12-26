import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFound from '../common/NotFound';
import NavBar from '../layout/Navbar';
import Footer from '../layout/Footer';
import Landing from '../layout/Landing';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Dashboard from '../dashboard';
import PrivateRoute from '../common/PrivateRoute';
import CreateProfile from '../profile/create-profile';
import EditProfile from '../profile/edit-profile';
import AddExperience from '../profile/add-credentials/add-experience';
import AddEducation from '../profile/add-credentials/add-education';
import Profiles from '../profiles';
import Profile from '../profile';

const app = () => (
    <Fragment>
        <NavBar />
        <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/profile/:handle" component={Profile} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/create-profile" component={CreateProfile} />
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            <PrivateRoute exact path="/add-experience" component={AddExperience} />
            <PrivateRoute exact path="/add-education" component={AddEducation} />
            <Route component={NotFound} />
        </Switch>
        <Footer />
    </Fragment>
);

export default app;

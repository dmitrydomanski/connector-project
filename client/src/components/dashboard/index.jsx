import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileActions from './profile-actions';
import Experience from './experience';
import Education from './education';

class Dashboard extends Component {
    componentDidMount() {
        this.onGetCurrentProfile();
    }

    onDeleteClick = () => {
        this.onDeleteAccount();
    }

    onGetCurrentProfile = () => {
        const { onGetCurrentProfile } = this.props;
        onGetCurrentProfile();
    }

    onDeleteAccount = () => {
        const { onDeleteAccount } = this.props;
        onDeleteAccount();
    }

    render() {
        const { auth } = this.props;
        const { user } = auth;
        const { profile } = this.props;
        const { devProfile, loading } = profile;

        let dashboardContent;

        if (devProfile === null || loading) {
            dashboardContent = <Spinner />;
        } else if (Object.keys(devProfile).length > 0) {
            dashboardContent = (
                <div>
                    <p className="lead text-muted">Welcome,
                        <Link to={`/profile/${devProfile.handle}`}>
                            {` ${user.name}`}
                        </Link>
                    </p>
                    <ProfileActions />
                    <Experience experience={devProfile.experience} />
                    <Education education={devProfile.education} />
                    <div style={{
                        marginTop: '60px',
                    }}
                    >
                        <button type="button" onClick={this.onDeleteClick} className="btn btn-danger">
                            Delete my account
                        </button>
                    </div>
                </div>
            );
        } else if (Object.keys(devProfile).length === 0) {
            dashboardContent = (
                <div>
                    <p className="lead text-muted"> Welcome {user.name}</p>
                    <p>You have not set up a profile yet, please add some info</p>
                    <Link to="/create-profile" className="btn btn-lg btn-info">Create Profile</Link>
                </div>
            );
        }

        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Dashboard</h1>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth,
});

const mapActionsToProps = dispatch => bindActionCreators({
    onGetCurrentProfile: getCurrentProfile,
    onDeleteAccount: deleteAccount,
}, dispatch);

Dashboard.propTypes = {
    auth: PropTypes.instanceOf(Object).isRequired,
    profile: PropTypes.instanceOf(Object).isRequired,
    onGetCurrentProfile: PropTypes.func.isRequired,
    onDeleteAccount: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(Dashboard);

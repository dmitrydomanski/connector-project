import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { getProfiles } from '../../actions/profileActions';
import ProfileItem from './profile-item';

/* eslint no-underscore-dangle: */
class Profiles extends Component {
    componentDidMount() {
        this.onGetProfiles();
    }

    onGetProfiles() {
        const { onGetProfiles } = this.props;
        onGetProfiles();
    }

    render() {
        const { profile } = this.props;
        const { profiles, loading } = profile;
        let profileItems;
        if (profiles === null || loading) {
            profileItems = <Spinner />;
        } else if (profiles.length > 0) {
            profileItems = profiles.map(prof => (
                <ProfileItem key={prof._id} profile={prof} />
            ));
        } else if (profiles.length === 0) {
            profileItems = <h4>No profiles found...</h4>;
        }

        return (
            <div className="profiles">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">
                                Developer Profiles
                            </h1>
                            <p className="lead text-center">
                                Browse and connect with developers
                            </p>
                            {profileItems}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    profile: state.profile,
});

const mapActionsToProps = dispatch => bindActionCreators({
    onGetProfiles: getProfiles,
}, dispatch);

Profiles.propTypes = {
    onGetProfiles: PropTypes.func.isRequired,
    profile: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(Profiles);

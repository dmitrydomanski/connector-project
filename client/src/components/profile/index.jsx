import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import ProfileHeader from './sections/profile-header';
import ProfileAbout from './sections/profile-about';
import ProfileCreds from './sections/profile-creds';
import ProfileGitHub from './sections/profile-github';
import Spinner from '../common/Spinner';
import { getProfileByHandle } from '../../actions/profileActions';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    componentDidMount() {
        const { match } = this.props;
        if (match.params.handle) {
            this.onGetProfileByHandle(match.params.handle);
        }
    }

    static getDerivedStateFromProps(props) {
        const { profile, history } = props;
        if (profile === null && profile.loading) {
            history.push('/not-found');
        }
        return null;
    }

    onGetProfileByHandle = (handle) => {
        const { onGetProfileByHandle } = this.props;
        onGetProfileByHandle(handle);
    }

    render() {
        const { profile } = this.props;
        const { devProfile } = profile;
        let profileContent;

        if (devProfile === null) {
            profileContent = <Spinner />;
        } else {
            profileContent = (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/profiles" className="btn btn-light mb-3 float-left">
                                Back to profiles
                            </Link>
                        </div>
                    </div>
                    <ProfileHeader profile={devProfile} />
                    <ProfileAbout profile={devProfile} />
                    <ProfileCreds
                        education={devProfile.education}
                        experience={devProfile.experience}
                    />
                    {devProfile.githubusername
                        ? (<ProfileGitHub username={devProfile.githubusername} />)
                        : null}
                </div>
            );
        }
        return (
            <div className="profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {profileContent}
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
    onGetProfileByHandle: getProfileByHandle,
}, dispatch);

Profile.propTypes = {
    profile: PropTypes.instanceOf(Object).isRequired,
    match: PropTypes.instanceOf(Object).isRequired,
    onGetProfileByHandle: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(Profile);

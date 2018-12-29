import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileHeader from './sections/profile-header';
import ProfileAbout from './sections/profile-about';
import ProfileCreds from './sections/profile-creds';
import ProfileGitHub from './sections/profile-github';
import Spinner from '../common/Spinner';
import { getProfileByHandle } from '../../actions/profileActions';

/* eslint react/destructuring-assignment: */
class Profile extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    componentDidMount() {
        const { match } = this.props;
        if (match.params.handle) {
            this.props.getProfileByHandle(match.params.handle);
        }
    }

    static getDerivedStateFromProps(props) {
        const { profile, history } = props;
        if (profile === null && profile.loading) {
            history.push('/not-found');
        }
        return null;
    }

    render() {
        const { profile } = this.props.profile;
        let profileContent;

        if (profile === null) {
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
                    <ProfileHeader profile={profile} />
                    <ProfileAbout profile={profile} />
                    <ProfileCreds education={profile.education} experience={profile.experience} />
                    {profile.githubusername
                        ? (<ProfileGitHub username={profile.githubusername} />)
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

Profile.propTypes = {
    profile: PropTypes.instanceOf(Object).isRequired,
    match: PropTypes.instanceOf(Object).isRequired,
    // history: PropTypes.instanceOf(Object).isRequired,
    getProfileByHandle: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
    getProfileByHandle,
})(Profile);

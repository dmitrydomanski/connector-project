import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import TextFieldGroup from '../../common/TextFieldGroup';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import SelectListGroup from '../../common/SelectListGroup';
import InputGroup from '../../common/InputGroup';
import { createProfile, getCurrentProfile } from '../../../actions/profileActions';
import isEmpty from '../../../validation/is-empty';

/* eslint react/destructuring-assignment: */
class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {
            },
        };
    }

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.err) {
            this.setState({
                errors: nextProps.err,
            });
        }

        if (nextProps.profile.profile) {
            const { profile } = nextProps.profile;
            let {
                company, website, location, githubusername, bio,
                twitter, facebook, linkedin, youtube, instagram, social,
            } = profile;

            const { handle, skills, status } = profile;

            const skillsCSV = skills.join(',');

            company = !isEmpty(company) ? company : '';
            website = !isEmpty(website) ? website : '';
            location = !isEmpty(location) ? location : '';
            githubusername = !isEmpty(githubusername)
                ? githubusername
                : '';
            bio = !isEmpty(bio) ? bio : '';
            social = !isEmpty(social) ? social : {
            };
            twitter = !isEmpty(social.twitter)
                ? social.twitter
                : '';
            facebook = !isEmpty(social.facebook)
                ? social.facebook
                : '';
            linkedin = !isEmpty(social.linkedin)
                ? social.linkedin
                : '';
            youtube = !isEmpty(social.youtube)
                ? social.youtube
                : '';
            instagram = !isEmpty(social.instagram)
                ? social.instagram
                : '';

            this.setState({
                handle,
                company,
                website,
                location,
                status,
                skills: skillsCSV,
                githubusername,
                bio,
                twitter,
                facebook,
                linkedin,
                youtube,
                instagram,
            });
        }
    }

    onSubmit = (e) => {
        const {
            displaySocialInputs, handle, company, website, location,
            status, skills, githubusername, bio, twitter, facebook, linkedin,
            youtube, instagram, social,
        } = this.state;
        const { history } = this.props;
        e.preventDefault();
        const profileData = {
            displaySocialInputs,
            handle,
            company,
            website,
            location,
            status,
            skills,
            githubusername,
            bio,
            twitter,
            facebook,
            linkedin,
            youtube,
            instagram,
            social,
        };

        this.props.createProfile(profileData, history);
    }

    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    }

    render() {
        const {
            handle, errors, status, company, website, location,
            skills, githubusername, bio, displaySocialInputs,
        } = this.state;

        let socialInputs;

        if (displaySocialInputs) {
            const { twitter, facebook, instagram, youtube, linkedin } = this.state;
            socialInputs = (
                <div>
                    <InputGroup
                        placeholder="Twitter Profile URL"
                        name="twitter"
                        icon={['fab', 'twitter']}
                        value={twitter}
                        onChange={this.onChange}
                        error={errors.twitter}
                    />

                    <InputGroup
                        placeholder="Facebook Page URL"
                        name="facebook"
                        icon={['fab', 'facebook']}
                        value={facebook}
                        onChange={this.onChange}
                        error={errors.facebook}
                    />

                    <InputGroup
                        placeholder="Linkedin Profile URL"
                        name="linkedin"
                        icon={['fab', 'linkedin']}
                        value={linkedin}
                        onChange={this.onChange}
                        error={errors.linkedin}
                    />

                    <InputGroup
                        placeholder="YouTube Channel URL"
                        name="youtube"
                        icon={['fab', 'youtube']}
                        value={youtube}
                        onChange={this.onChange}
                        error={errors.youtube}
                    />

                    <InputGroup
                        placeholder="Instagram Page URL"
                        name="instagram"
                        icon={['fab', 'instagram']}
                        value={instagram}
                        onChange={this.onChange}
                        error={errors.instagram}
                    />
                </div>
            );
        }

        const options = [
            {
                label: '* Select professional status', value: 0,
            },
            {
                label: 'Developer', value: 'Developer',
            },
            {
                label: 'Junior Developer', value: 'Junior Developer',
            },
            {
                label: 'Senior Developer', value: 'Senior Developer',
            },
            {
                label: 'Manager', value: 'Manager',
            },
            {
                label: 'Student or Learning', value: 'Student or Learning',
            },
            {
                label: 'Instructor or Teacher', value: 'Instructor or Teacher',
            },
            {
                label: 'Intern', value: 'Intern',
            },
            {
                label: 'Other', value: 'Other',
            },
        ];
        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Back to dashboard
                            </Link>
                            <h1 className="display-4 text-center">Edit Your Profile</h1>
                            <p className="lead text-center">
                                Lets get some information to make your profile stand out
                            </p>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* Profile Handler"
                                    name="handle"
                                    value={handle}
                                    error={errors.handle}
                                    info="A unique handle for your profile URL"
                                    onChange={this.onChange}
                                />

                                <SelectListGroup
                                    placeholder="Status"
                                    name="status"
                                    value={status}
                                    error={errors.status}
                                    options={options}
                                    info="Where are you in your career"
                                    onChange={this.onChange}
                                />

                                <TextFieldGroup
                                    placeholder="Company"
                                    name="company"
                                    value={company}
                                    onChange={this.onChange}
                                    error={errors.company}
                                    info="Could be your own company or one you work for"
                                />
                                <TextFieldGroup
                                    placeholder="Website"
                                    name="website"
                                    value={website}
                                    onChange={this.onChange}
                                    error={errors.website}
                                    info="Could be your own website or a company one"
                                />
                                <TextFieldGroup
                                    placeholder="Location"
                                    name="location"
                                    value={location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                    info="City or city & state suggested (eg. Boston, MA)"
                                />
                                <TextFieldGroup
                                    placeholder="* Skills"
                                    name="skills"
                                    value={skills}
                                    onChange={this.onChange}
                                    error={errors.skills}
                                    info="Please use comma separated values (eg.
                                        HTML,CSS,JavaScript,PHP"
                                />
                                <TextFieldGroup
                                    placeholder="Github Username"
                                    name="githubusername"
                                    value={githubusername}
                                    onChange={this.onChange}
                                    error={errors.githubusername}
                                    info="If you want your latest repos and a Github link, include your username"
                                />
                                <TextAreaFieldGroup
                                    placeholder="Short Bio"
                                    name="bio"
                                    value={bio}
                                    onChange={this.onChange}
                                    error={errors.bio}
                                    info="Tell us a little about yourself"
                                />

                                <div className="mb-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            this.setState(prevState => ({
                                                displaySocialInputs: !prevState.displaySocialInputs,
                                            }));
                                        }}
                                        className="btn btn-light"
                                    >
                                        Add Social Network Links
                                    </button>
                                    <span className="text-muted">Optional</span>
                                </div>
                                {socialInputs}
                                <input
                                    type="submit"
                                    value="Submit"
                                    className="btn btn-info btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    profile: state.profile,
    err: state.err,
});

EditProfile.propTypes = {
    err: PropTypes.instanceOf(Object).isRequired,
    history: PropTypes.instanceOf(Object).isRequired,
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps, {
    createProfile,
    getCurrentProfile,
})(withRouter(EditProfile));

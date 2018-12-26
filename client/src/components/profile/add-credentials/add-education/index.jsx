import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../../../common/TextFieldGroup';
import TextAreaFieldGroup from '../../../common/TextAreaFieldGroup';
import { addEducation } from '../../../../actions/profileActions';

class AddEducation extends Component {
    constructor() {
        super();
        this.state = {
            school: '',
            degree: '',
            fieldofstudy: '',
            from: '',
            to: '',
            current: false,
            description: '',
            errors: {
            },
            disabled: false,
        };
    }

    /* eslint react/destructuring-assignment: */
    /* eslint jsx-a11y/label-has-associated-control: */

    componentWillReceiveProps(nextProps) {
        if (nextProps.err) {
            this.setState({
                errors: nextProps.err,
            });
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { school, degree, fieldofstudy, from, to, current, description } = this.state;

        const educationData = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description,
        };

        this.props.addEducation(educationData, this.props.history);
    }

    onCheck = () => {
        const { disabled, current } = this.state;
        this.setState({
            disabled: !disabled,
            current: !current,
        });
    }

    render() {
        const {
            school, degree, fieldofstudy, from, to,
            current, description, errors, disabled,
        } = this.state;

        return (
            <div className="add-education">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Back to dashboard
                            </Link>
                            <h1 className="display-4 text-center">Add education</h1>
                            <p className="lead text-center">Add any school, bootcamp, etc.</p>
                            <small className="d-block pb-3">*=required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* School"
                                    name="school"
                                    value={school}
                                    onChange={this.onChange}
                                    error={errors.school}
                                />
                                <TextFieldGroup
                                    placeholder="* Degree"
                                    name="degree"
                                    value={degree}
                                    onChange={this.onChange}
                                    error={errors.degree}
                                />
                                <TextFieldGroup
                                    placeholder="* Field of study"
                                    name="fieldofstudy"
                                    value={fieldofstudy}
                                    onChange={this.onChange}
                                    error={errors.fieldofstudy}
                                />
                                <h6>From Date</h6>
                                <TextFieldGroup
                                    name="from"
                                    type="date"
                                    value={from}
                                    onChange={this.onChange}
                                    error={errors.from}
                                />
                                <h6>To Date</h6>
                                <TextFieldGroup
                                    name="to"
                                    type="date"
                                    value={to}
                                    onChange={this.onChange}
                                    error={errors.to}
                                    disabled={disabled ? 'disabled' : ''}
                                />
                                <div className="form-check mb-4">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="current"
                                        value={current}
                                        checked={current}
                                        onChange={this.onCheck}
                                        id="current"
                                    />
                                    <label
                                        htmlFor="current"
                                        className="form-check-label"
                                    >
                                        Current Job
                                    </label>
                                </div>
                                <TextAreaFieldGroup
                                    placeholder="Program Description"
                                    name="description"
                                    value={description}
                                    onChange={this.onChange}
                                    error={errors.description}
                                    info="Tell us about the the program"
                                />
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

AddEducation.propTypes = {
    // profile: PropTypes.instanceOf(Object).isRequired,
    err: PropTypes.instanceOf(Object).isRequired,
    history: PropTypes.instanceOf(Object).isRequired,
    addEducation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile,
    err: state.err,
});

export default connect(mapStateToProps, {
    addEducation,
})(withRouter(AddEducation));

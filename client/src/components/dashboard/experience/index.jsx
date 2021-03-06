import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { bindActionCreators } from 'redux';
import { deleteExperience } from '../../../actions/profileActions';

/* eslint no-underscore-dangle: */
class Experience extends Component {
    onDeleteClick = id => () => {
        this.onDeleteExperience(id);
    }

    onDeleteExperience = (id) => {
        const { onDeleteExperience } = this.props;
        onDeleteExperience(id);
    }

    render() {
        const { experience } = this.props;
        const experienceList = experience.map(exp => (
            <tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td>
                    <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
                    {exp.to === null ? ' current' : (
                        <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                    )}
                </td>
                <td>
                    <button
                        type="button"
                        onClick={this.onDeleteClick(exp._id)}
                        className="btn btn-danger btn-sm"
                    > Delete
                    </button>
                </td>
            </tr>
        ));
        return (
            <div>
                <h4 className="mb-4">Experience Credentials</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Title</th>
                            <th>Years</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {experienceList}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapActionsToProps = dispatch => bindActionCreators({
    onDeleteExperience: deleteExperience,
}, dispatch);

Experience.propTypes = {
    onDeleteExperience: PropTypes.func.isRequired,
    experience: PropTypes.instanceOf(Object).isRequired,
};

export default connect(null, mapActionsToProps)(Experience);

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import isEmpty from '../../../../validation/is-empty';

const profileAbout = ({ profile }) => {
    const { user, skills, bio } = profile;

    // Get first name
    const firstName = user.name.trim().split(' ')[0];

    // Skill List
    const userSkills = skills.map((skill, index) => (
        <div key={parseInt(index.toString(), 10)} className="p-3">
            <FontAwesomeIcon icon={['fas', 'check']} />
            {skill}
        </div>
    ));

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card card-body bg-light mb-3">
                    <h3 className="text-center text-info">{firstName}&apos;s Bio</h3>
                    <p className="lead">
                        {isEmpty(bio)
                            ? (<span>{firstName} does not have a bio</span>)
                            : (<span>{bio}</span>)}
                    </p>
                    <hr />
                    <h3 className="text-center text-info">Skill Set</h3>
                    <div className="row">
                        <div className="d-flex flex-wrap justify-content-center align-items-center">
                            {userSkills}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

profileAbout.propTypes = {
    profile: PropTypes.instanceOf(Object).isRequired,
};

export default profileAbout;

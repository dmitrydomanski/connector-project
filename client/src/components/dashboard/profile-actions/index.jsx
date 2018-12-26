import React from 'react';
// import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const ProfileActions = () => (
    <div className="btn-group mb-4" role="group">
        <Link to="/edit-profile" className="btn btn-light">
            <FontAwesomeIcon className="text-info mr-1" icon={['fas', 'user-circle']} />
            Edit Profile
        </Link>
        <Link to="/add-experience" className="btn btn-light">
            <FontAwesomeIcon className="text-info mr-1" icon={['fab', 'black-tie']} />
            Add Experience
        </Link>
        <Link to="/add-education" className="btn btn-light">
            <FontAwesomeIcon className="text-info mr-1" icon={['fas', 'graduation-cap']} />
            Add Education
        </Link>
    </div>
);


// ProfileActions.propTypes = {

// };

export default ProfileActions;

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import isEmpty from '../../../validation/is-empty';

const profileItem = ({ profile }) => (
    <div className="card card-body bg-light mb-3">
        <div className="row">
            <div className="col-2">
                <img src={profile.user.avatar} alt="" className="rounded-circle" />
            </div>
            <div className="col-lg-6 col-md-4 col-8">
                <h3>{profile.user.name}</h3>
                <p>{profile.status}{isEmpty(profile.company)
                    ? null
                    : (<span> at {profile.company}</span>)}
                </p>
                <p>
                    {isEmpty(profile.location) ? null : (<span>{profile.location}</span>)}
                </p>
                <Link to={`/profile/${profile.handle}`} className="btn btn-info">View Profile</Link>
            </div>
            <div className="col-md-4 d-none d-md-block">
                <h4>Skill Set</h4>
                <ul className="list-group">
                    {profile.skills.slice(0, 4).map((skill, index) => (
                        <li key={parseInt(index.toString(), 10)} className="list-group-item">
                            <FontAwesomeIcon className="pr-1" icon={['fas', 'check']} />
                            {skill}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
);

profileItem.propTypes = {
    profile: PropTypes.instanceOf(Object).isRequired,
};

export default profileItem;

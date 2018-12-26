import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import isEmpty from '../../../../validation/is-empty';

/* eslint react/jsx-no-target-blank: */
const profileHeader = ({ profile }) => {
    const { user, status, company, location, website, social } = profile;
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card card-body bg-info text-white mb-3">
                    <div className="row">
                        <div className="col-4 col-md-3 m-auto">
                            <img
                                className="rounded-circle"
                                src={user.avatar}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="text-center">
                        <h1 className="display-4 text-center">{user.name}</h1>
                        <p className="lead text-center">
                            {status}{' '}
                            {isEmpty(company) ? null : (
                                <span>at {company}</span>
                            )}
                        </p>
                        {isEmpty(location) ? null : <p>{location}</p>}
                        <p>
                            {isEmpty(website) ? null : (
                                <a
                                    className="text-white p-2"
                                    href={website}
                                    target="_blank"
                                >
                                    <FontAwesomeIcon icon={['fas', 'globe']} size="2x" />
                                </a>
                            )}

                            {isEmpty(social && social.twitter) ? null : (
                                <a
                                    className="text-white p-2"
                                    href={social.twitter}
                                    target="_blank"
                                >
                                    <FontAwesomeIcon icon={['fab', 'twitter']} size="2x" />
                                </a>
                            )}

                            {isEmpty(social && social.facebook) ? null : (
                                <a
                                    className="text-white p-2"
                                    href={social.facebook}
                                    target="_blank"
                                >
                                    <FontAwesomeIcon icon={['fab', 'facebook']} size="2x" />
                                </a>
                            )}

                            {isEmpty(social && social.linkedin) ? null : (
                                <a
                                    className="text-white p-2"
                                    href={social.linkedin}
                                    target="_blank"
                                >
                                    <FontAwesomeIcon icon={['fab', 'linkedin']} size="2x" />
                                </a>
                            )}

                            {isEmpty(social && social.youtube) ? null : (
                                <a
                                    className="text-white p-2"
                                    href={social.youtube}
                                    target="_blank"
                                >
                                    <FontAwesomeIcon icon={['fab', 'youtube']} size="2x" />
                                </a>
                            )}

                            {isEmpty(social && social.instagram) ? null : (
                                <a
                                    className="text-white p-2"
                                    href={social.instagram}
                                    target="_blank"
                                >
                                    <FontAwesomeIcon icon={['fab', 'instagram']} size="2x" />
                                </a>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

profileHeader.propTypes = {
    profile: PropTypes.instanceOf(Object).isRequired,
};

export default profileHeader;

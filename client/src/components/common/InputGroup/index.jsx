import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const InputGroup = ({
    name,
    placeholder,
    value,
    error,
    icon,
    type,
    onChange,
}) => (
        /* eslint indent: */
        /* eslint react/jsx-indent: */
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <FontAwesomeIcon icon={icon} />
                </span>
            </div>
            <input
                className={classnames('form-control form-control-lg', {
                    'is-invalid': error,
                })}
                placeholder={placeholder}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
            />
            {error && (
                <div className="invalid-feedback">{error}</div>
            )}
        </div>
    );

InputGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
    icon: PropTypes.arrayOf(String),
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

InputGroup.defaultProps = {
    placeholder: null,
    icon: null,
    error: null,
    type: 'text',
};

export default InputGroup;

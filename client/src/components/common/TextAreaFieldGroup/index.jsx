import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextAreaFieldGroup = ({
    name,
    placeholder,
    value,
    error,
    info,
    onChange,
}) => (
        /* eslint indent: */
        /* eslint react/jsx-indent: */
        <div className="form-group">
            <textarea
                className={classnames('form-control form-control-lg', {
                    'is-invalid': error,
                })}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
            {error && (
                <div className="invalid-feedback">{error}</div>
            )}
            {info && <small className="form-text text-muted">{info}</small>}
        </div>
    );

TextAreaFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

TextAreaFieldGroup.defaultProps = {
    placeholder: null,
    info: null,
    error: null,
    value: '',
};

export default TextAreaFieldGroup;

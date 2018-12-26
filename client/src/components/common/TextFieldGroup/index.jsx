import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({
    name,
    placeholder,
    value,
    // label,
    error,
    info,
    type,
    onChange,
    disabled,
}) => (
        /* eslint indent: */
        /* eslint react/jsx-indent: */
        <div className="form-group">
            <input
                type={type}
                className={classnames('form-control form-control-lg', {
                    'is-invalid': error,
                })}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
            {error && (
                <div className="invalid-feedback">{error}</div>
            )}
            {info && <small className="form-text text-muted">{info}</small>}
        </div>
    );

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    info: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string,
    // label: PropTypes.string.isRequired,
};

TextFieldGroup.defaultProps = {
    placeholder: null,
    info: null,
    error: null,
    disabled: null,
    type: 'text',
    value: '',
};

export default TextFieldGroup;

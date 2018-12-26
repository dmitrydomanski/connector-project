import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectListGroup = ({
    name,
    value,
    error,
    info,
    onChange,
    options,
}) => {
    const selectOptions = options.map(option => (
        <option key={option.label} value={option.value}>{option.label}</option>
    ));

    return (
        /* eslint indent: */
        /* eslint react/jsx-indent: */
        <div className="form-group">
            <select
                className={classnames('form-control form-control-lg', {
                    'is-invalid': error,
                })}
                name={name}
                value={value}
                onChange={onChange}
            > {selectOptions}
            </select>
            {error && (
                <div className="invalid-feedback">{error}</div>
            )}
            {info && <small className="form-text text-muted">{info}</small>}
        </div>
    );
};

SelectListGroup.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(String).isRequired,
};

SelectListGroup.defaultProps = {
    info: null,
    error: null,
};

export default SelectListGroup;

import Validator from 'validator';
import isEmpty from './is-empty';

const validateEducationInput = (data) => {
    let errors = {};
    let { school, degree, fieldofstudy, from } = data;

    school = !isEmpty(school) ? school : '';
    degree = !isEmpty(degree) ? degree : '';
    fieldofstudy = !isEmpty(fieldofstudy) ? fieldofstudy : '';
    from = !isEmpty(from) ? from : '';

    if (Validator.isEmpty(school)) {
        errors.school = 'School field is required';
    }

    if (Validator.isEmpty(degree)) {
        errors.degree = 'Degree field is required';
    }

    if (Validator.isEmpty(fieldofstudy)) {
        errors.fieldofstudy = 'Field of study field is required';
    }

    if (Validator.isEmpty(from)) {
        errors.from = 'From date field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

export default validateEducationInput;
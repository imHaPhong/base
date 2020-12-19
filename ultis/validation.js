const hapi = require('@hapi/joi')

const createAccount = (data) => {
    const shema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required
    };
    return Joi.validate(data, schema)
}

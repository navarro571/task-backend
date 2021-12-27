const joi = require('joi');

const key = joi.string().min(1).max(50);

const getKeySchema = joi.object({
    key: key.required()
});

const createKeySchema = joi.object({
    key: key.required(),
});
module.exports = {
    getKeySchema,
    createKeySchema
};
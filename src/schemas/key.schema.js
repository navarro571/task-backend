const joi = require('joi');

const id = joi.number().integer();
const key = joi.string().min(1).max(50);

const getKeySchema = joi.object({
    id: id.required()
});

const createKeySchema = joi.object({
    key: key.required(),
});
module.exports = {
    getKeySchema,
    createKeySchema
};
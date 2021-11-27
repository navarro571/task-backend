const joi = require('joi');

const id = joi.number();
const name = joi.string().min(1).max(30);

const createGroupSchema = joi.object({
    name: name.required(),
});

const updateGroupSchema = joi.object({
    name: name.required(),
});

module.exports = {
    createGroupSchema,
    updateGroupSchema
}
const joi = require('joi');

const id = joi.number().integer();
const name = joi.string().min(1).max(30);
const keyId = joi.number().integer();

const getTaskGroupSchema = joi.object({
    id: id.required()
});

const createGroupSchema = joi.object({
    name: name.required(),
    keyId: keyId.required()
});

const updateGroupSchema = joi.object({
    name,
    keyId
});

module.exports = {
    getTaskGroupSchema,
    createGroupSchema,
    updateGroupSchema
}
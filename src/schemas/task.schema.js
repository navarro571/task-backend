const joi = require('joi');

const id = joi.number().integer();
const groupId = joi.number().integer();
const name = joi.string().min(1).max(50);
const description = joi.string().allow("");
const state = joi.boolean();

const getTaskSchema = joi.object({
    id: id.required()
});
const createTaskSchema = joi.object({
    groupId: groupId.required(),
    name: name.required(),
    description: description.required(),
    state,
});

const updatePartialTaskSchema = joi.object({
    groupId: groupId,
    name: name,
    description,
    state,
});
const updateTaskSchema = joi.object({
    groupId: groupId.required(),
    name: name.required(),
    desc: description.required(),
});

module.exports = {
    getTaskSchema,
    createTaskSchema,
    updatePartialTaskSchema,
    updateTaskSchema
}
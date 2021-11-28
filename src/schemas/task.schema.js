const joi = require('joi');

const groupid = joi.number();
const name = joi.string().min(1).max(50);
const description = joi.string();

const createTaskSchema = joi.object({
    groupid: groupid.required(),
    name: name.required(),
    desc: description.required(),
});

const updatePartialTaskSchema = joi.object({
    groupid: groupid,
    name: name,
    desc: description,
});
const updateTaskSchema = joi.object({
    groupid: groupid.required(),
    name: name.required(),
    desc: description.required(),
});

module.exports = {
    createTaskSchema,
    updatePartialTaskSchema,
    updateTaskSchema
}
const joi = require('joi');

const id = joi.number();
const name = joi.string().min(1).max(50);
const description = joi.string();

const createTaskSchema = joi.object({
    name: name.required(),
    desc: description.required(),
});

const updatePartialTaskSchema = joi.object({
    name: name.required(),
    desc: description,
});
const updateTaskSchema = joi.object({
    name: name.required(),
    desc: description.required(),
});

module.exports = {
    createTaskSchema,
    updatePartialTaskSchema,
    updateTaskSchema
}
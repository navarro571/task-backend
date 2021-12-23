const boom = require('@hapi/boom');
const { models } = require('../lib/sequelize');

class TaskService {
    constructor() {}

    async get() {
        return models.Task.findAll();
    }

    async find(id){
        const task = await models.Task.findByPk(id);
        if(!task) throw boom.notFound('Task not found');
        return task;
    }

    async update(id, body) {
        const task = await this.find(id);
        const res = await task.update(body);
        return res;
    }

    async create(body) {
        const newTask = await models.Task.create(body);
        return newTask;
    }

    async delete(id) {
        const task = await this.find(id);
        await task.destroy();
        return {
            message: 'Task deleted',
            taskId: id,
        };
    }
}
module.exports = TaskService;
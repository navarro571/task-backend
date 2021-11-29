const boom = require('@hapi/boom');

class TaskService {
    tasks;
    constructor() {
        this.tasks = [];
    }

    async get() {
        return this.tasks;
    }

    async find(id) {
        const task = this.tasks.find(task => task.id == id);
        if(!task) throw boom.notFound("Tasks not found");
        return group;
    }

    async update(id, body) {
        const task = this.tasks.find(task => task.id == id);
        if(!task) throw boom.notFound("Tasks not found");
        const index = this.tasks.indexOf(task);
        this.tasks[index] = {
            ...task,
            ...body,
        }
        return this.tasks[index];
    }

    async create(body) {
        const task = {
            id: this.tasks.length,
            ...body,
        }
        this.tasks.push(task);
        return task;
    }
    async delete(id){
        const task = this.tasks.find(task => task.id == id);
        this.tasks.splice(this.tasks.indexOf(task), 1);
        return task;
    }
}
module.exports = TaskService;
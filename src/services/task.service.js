const boom = require('@hapi/boom');

class TaskService {
    tasks;
    constructor() {
        this.tasks = new Map();
    }

    async get(key) {
        if(!this.tasks.has(key)) this.tasks.set(key, []);
        return this.tasks.get(key);
    }

    async update(key, id, body) {
        if(!this.tasks.has(key)) this.tasks.set(key, []);
        const tasks = this.tasks.get(key);
        const task = tasks.find(task => task.id == id);
        if(!task) throw boom.notFound("Tasks not found");
        const index = tasks.indexOf(task);
        tasks[index] = {
            ...task,
            ...body,
        };
        this.tasks.set(key, tasks);
        return tasks[index];
    }

    async create(key, body) {
        if(!this.tasks.has(key)) this.tasks.set(key, []);
        const tasks = this.tasks.get(key);
        const task = {
            id: tasks.length,
            ...body,
        }
        tasks.push(task);
        this.tasks.set(key, tasks);
        return task;
    }
    async delete(key, id){
        if(!this.tasks.has(key)) this.tasks.set(key, []);
        const tasks = this.tasks.get(key);
        const task = tasks.find(task => task.id == id);
        if(!task) throw boom.notFound("Task not found");
        tasks.splice(tasks.indexOf(task), 1);
        this.tasks.set(key, tasks);
        //this.refreshID(key);
        return task;
    }

    /*refreshID(key){
        const tasks = this.tasks.get(key);
        tasks.map(task => {
            task.id = tasks.indexOf(task);
        })
    }*/
}
module.exports = TaskService;
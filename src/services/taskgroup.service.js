const boom = require('@hapi/boom');

class TaskGroupService {
    taskgroups;
    constructor() {
        this.taskgroups = [];
        this.taskgroups.push({ id: this.taskgroups.length, name: "TASKS" });
        this.taskgroups.push({ id: this.taskgroups.length, name: "DOING" });
        this.taskgroups.push({ id: this.taskgroups.length, name: "DONE" });
    }

    async get() {
        if(this.taskgroups.length <= 0) throw boom.notFound("Groups list empty");
        return this.taskgroups;
    }

    async find(id) {
        const group = this.taskgroups.find(group => group.id == id);
        if(!group) throw boom.notFound("Group not found");
        return group;
    }

    async update(id, body) {
        const index = this.taskgroups.findIndex(group => group.id == id);
        if(index === -1) throw boom.notFound("Group not found");
        this.taskgroups[index] = {
            id: index,
            ...body,
        }
        return this.taskgroups[index];
    }

    async create(body) {
        const { name } = body;
        if(this.taskgroups.find(group => group.name.toLowerCase() == name.toLowerCase()))
            throw boom.conflict("Group name is already in use");
        const group = {
            id: this.taskgroups.length,
            ...body,
        }
        this.taskgroups.push(group);
        return group;
    }
}
module.exports = TaskGroupService;
const boom = require('@hapi/boom');

class TaskGroupService {
    taskgroups;
    constructor() {
        this.taskgroups = new Map();
    }

    async get(key) {
        if(!this.taskgroups.has(key)) this.taskgroups.set(key, []);
        return this.taskgroups.get(key);
    }

    async find(key, id) {
        if(!this.taskgroups.has(key)) this.taskgroups.set(key, []);
        const group = this.taskgroups.get(key).find(group => group.id == id);
        if(!group) throw boom.notFound("Group not found");
        return group;
    }

    async update(key, id, body) {
        if(!this.taskgroups.has(key)) this.taskgroups.set(key, []);
        const groups = this.taskgroups.get(key);
        const index = groups.findIndex(group => group.id == id);
        if(index === -1) throw boom.notFound("Group not found");
        groups[index] = {
            id: index,
            ...body,
        }
        this.taskgroups.set(key, groups);
        return groups[index];
    }

    async create(key, body) {
        if(!this.taskgroups.has(key)) this.taskgroups.set(key, []);
        const groups = this.taskgroups.get(key);
        const { name } = body;
        if(groups.find(group => group.name.toLowerCase() == name.toLowerCase()))
            throw boom.conflict("Group name is already in use");
        const group = {
            id: groups.length,
            ...body,
        }
        groups.push(group);
        this.taskgroups.set(key, groups);
        return group;
    }

    async delete(key, id){
        if(!this.taskgroups.has(key)) this.taskgroups.set(key, []);
        const groups = this.taskgroups.get(key);
        const group = groups.find(group => group.id == id);
        if(!group) throw boom.notFound("Group not found");
        groups.splice(groups.indexOf(group), 1);
        this.taskgroups.set(key, groups);
        //this.refreshID(key);
        return group;
    }

    /*refreshID(key){
        const groups = this.taskgroups.get(key);
        groups.map(group => {
            group.id = groups.indexOf(group);
        })
    }*/
}
module.exports = TaskGroupService;
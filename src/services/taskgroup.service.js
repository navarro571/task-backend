const boom = require("@hapi/boom");
const { models } = require("../lib/sequelize");

class TaskGroupService {
  constructor() {}

  async get() {
    return models.Group.findAll();
  }

  async find(id) {
    const group = await models.Group.findByPk(id, {
      include: ['tasks'],
    });
    if (!group) throw boom.notFound("Group not found");
    return group;
  }

  async update(id, body) {
    const group = await this.find(id);
    const res = await group.update(body);
    return res;
  }

  async create(body) {
    const newGroup = await models.Group.create(body);
    return newGroup;
  }

  async delete(id) {
    const group = await this.find(id);
    await group.destroy();
    return {
      message: "Group deleted",
      taskId: id,
    };
  }
}
module.exports = TaskGroupService;

const { Key, KeySchema } = require('./key.model');
const { Group, GroupSchema } = require('./group.model');
const { Task, TaskSchema } = require('./task.model');

function setupModels(sequelize){
    Key.init(KeySchema, Key.config(sequelize));
    Group.init(GroupSchema, Group.config(sequelize));
    Task.init(TaskSchema, Task.config(sequelize));

    Key.associate(sequelize.models);
    Group.associate(sequelize.models);
    Task.associate(sequelize.models);
}

module.exports = setupModels;
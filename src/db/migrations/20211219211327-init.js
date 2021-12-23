'use strict';

const { KEY_TABLE, KeySchema } = require('../models/key.model');
const { GROUP_TABLE, GroupSchema } = require('../models/group.model');
const { TASK_TABLE, TaskSchema } = require('../models/task.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(KEY_TABLE, KeySchema);
    await queryInterface.createTable(GROUP_TABLE, GroupSchema);
    await queryInterface.createTable(TASK_TABLE, TaskSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(TASK_TABLE);
    await queryInterface.dropTable(GROUP_TABLE);
    await queryInterface.dropTable(KEY_TABLE);
  }
};

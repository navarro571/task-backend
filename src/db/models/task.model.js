const { Sequelize, DataTypes, Model } = require("sequelize");
const { GROUP_TABLE } = require("./group.model");

const TASK_TABLE = "tasks";

const TaskSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  state: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  groupId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: "group_id",
    references: {
      model: GROUP_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  createdAt: {
    allowNull: false,
    field: "created_at",
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class Task extends Model {
  static associate(models) {
    this.belongsTo(models.Group, { as: "group", onDelete:'CASCADE' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TASK_TABLE,
      modelName: "Task",
      timestamps: false,
    };
  }
}

module.exports = { TASK_TABLE, TaskSchema, Task };

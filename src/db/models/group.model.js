const { Sequelize, DataTypes, Model } = require("sequelize");
const { KEY_TABLE } = require("./key.model");

const GROUP_TABLE = "groups";

const GroupSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
  keyId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: "key_id",
    references: {
      model: KEY_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE"
  },
  createdAt: {
    allowNull: false,
    field: "created_at",
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class Group extends Model {
  static associate(models) {
    this.hasMany(models.Task, {
      as: "tasks",
      foreignKey: "groupId",
    });
    this.belongsTo(models.Key, { as: 'key', onDelete:'CASCADE' });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: GROUP_TABLE,
      modelName: "Group",
      timestamps: false,
    };
  }
}

module.exports = { GROUP_TABLE, GroupSchema, Group };

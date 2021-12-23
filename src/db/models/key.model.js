const { Sequelize, DataTypes, Model } = require('sequelize');

const KEY_TABLE = 'keys';

const KeySchema = {
    id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    key: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
    },
    createdAt: {
        allowNull: false,
        field: 'created_at',
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    }
}

class Key extends Model {
    static associate(models) {
        this.hasMany(models.Group, {
            as: 'groups',
            foreignKey: 'keyId'
        });
    }
    static config(sequelize){
        return {
            sequelize,
            tableName: KEY_TABLE,
            modelName: 'Key',
            timestamps: false
        }
    }
}

module.exports = { KEY_TABLE, KeySchema, Key }
const boom = require('@hapi/boom');
const { models } = require('../lib/sequelize');

class KeyService {
    constructor() {}

    async get() {
        return models.Key.findAll();
    }

    async find(id){
        const key = await models.Key.findByPk(id, {
            include: {
                association: "groups",
                include: ['tasks'],
            }
        });
        if(!key) throw boom.notFound('Key not found');
        return key;
    }

    async create(body) {
        const newKey = await models.Key.create(body);
        return newKey;
    }

    async delete(id) {
        const key = await this.find(id);
        await key.destroy();
        return {
            message: 'Key deleted',
            keyId: id,
        };
    }
}
module.exports = KeyService;
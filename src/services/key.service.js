const boom = require('@hapi/boom');
const { models } = require('../lib/sequelize');

class KeyService {
    constructor() {}

    async get() {
        return models.Key.findAll();
    }

    async find(key){
        const res = await models.Key.findOne({
            where: { key },
            include: {
                association: "groups",
                include: ['tasks'],
            }
        });
        if(!res) throw boom.notFound('Key not found');
        return res;
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
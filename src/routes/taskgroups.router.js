const express = require('express');
const Validate = require('../middlewares/validator.handler');
const { createGroupSchema, updateGroupSchema } = require('../schemas/taskgroup.schema');
const TaskGroupService = require('../services/taskgroup.service');

const router = express.Router();
const service = new TaskGroupService();


router.get('/', async (req, res, next) => {
    try {
        const { key } = req.query;
        let serviceRes = await service.get(key);
        res.status(200).json(serviceRes);
    } catch (error) {
        next(error);
    }
});

router.post('/', [
    Validate(createGroupSchema, 'body'),
    async (req, res, next) => {
        try {
            const { key } = req.query;
            const body = req.body;
            const serviceRes = await service.create(key, body);
            res.status(201).json(serviceRes)
        } catch (error) {
            next(error);
        }
    }
]);

router.put('/', [
    Validate(updateGroupSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id, key } = req.query;
            const body = req.body;
            const serviceRes = await service.update(key, id, body);
            res.status(202).send(serviceRes);
        } catch (error) {
            next(error);
        }
    }
]);

router.delete("/", async (req, res, next) => {
    try {
        const { id, key } = req.query;
      const groupDeleted = await service.delete(key, id);
      res.status(200).json(groupDeleted);
    } catch (error) {
      next(error);
    }
});


module.exports = router;
const express = require("express");
const Validate = require("../middlewares/validator.handler");
const {
  createGroupSchema,
  updateGroupSchema,
  getTaskGroupSchema,
} = require("../schemas/taskgroup.schema");
const TaskGroupService = require("../services/taskgroup.service");

const router = express.Router();
const service = new TaskGroupService();

router.get("/", async (req, res, next) => {
  try {
    let serviceRes = await service.get();
    res.status(200).json(serviceRes);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", [
  Validate(getTaskGroupSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      let serviceRes = await service.find(id);
      res.status(200).json(serviceRes);
    } catch (error) {
      next(error);
    }
  }
]);

router.post("/", [
  Validate(createGroupSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const serviceRes = await service.create(body);
      res.status(201).json(serviceRes);
    } catch (error) {
      next(error);
    }
  },
]);

router.put("/:id", [
  Validate(updateGroupSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const serviceRes = await service.update(id, body);
      res.status(202).send(serviceRes);
    } catch (error) {
      next(error);
    }
  },
]);

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const groupDeleted = await service.delete(id);
    res.status(200).json(groupDeleted);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

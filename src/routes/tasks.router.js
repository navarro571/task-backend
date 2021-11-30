const express = require("express");
const Validate = require("../middlewares/validator.handler");
const { createTaskSchema, updateTaskSchema, updatePartialTaskSchema } = require("../schemas/task.schema");
const TaskService = require("../services/task.service");

const router = express.Router();

const service = new TaskService();

router.get("/", async (req, res, next) => {
  try {
    const { key } = req.query;
    let tasks = await service.get(key);
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
});

router.post("/", [
  Validate(createTaskSchema, 'body'),
  async (req, res, next) => {
    try {
      const { key } = req.query;
      const newTask = await service.create(key, req.body);
      res.status(201).json(newTask);
    } catch (error) {
      next(error);
    }
  }
]);

router.put("/", [
  Validate(updateTaskSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id, key } = req.query;
      const taskUpdated = await service.update(key, id, req.body);
      res.status(202).json(taskUpdated);
    } catch (error) {
      next(error);
    }
  }
]);

router.patch("/", [
  Validate(updatePartialTaskSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id, key } = req.query;
      const taskUpdated = await service.update(key, id, req.body);
      res.status(202).json(taskUpdated);
    } catch (error) {
      next(error);
    }
  }
]);

router.delete("/", async (req, res, next) => {
  try {
    const { id, key } = req.query;
    const taskDeleted = await service.delete(key, id);
    res.status(200).json(taskDeleted);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

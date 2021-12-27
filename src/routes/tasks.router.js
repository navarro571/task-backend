const express = require("express");
const Validate = require("../middlewares/validator.handler");
const { createTaskSchema, updateTaskSchema, updatePartialTaskSchema, getTaskSchema } = require("../schemas/task.schema");
const TaskService = require("../services/task.service");

const router = express.Router();

const service = new TaskService();

router.get("/", async (req, res, next) => {
  try {
    let tasks = await service.get();
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", [
  Validate(getTaskSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      let task = await service.find(id);
      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  }
]);

router.post("/", [
  Validate(createTaskSchema, 'body'),
  async (req, res, next) => {
    try {
      const newTask = await service.create(req.body);
      res.status(201).json(newTask);
    } catch (error) {
      next(error);
    }
  }
]);

router.put("/:id", [
  Validate(updateTaskSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const taskUpdated = await service.update(id, req.body);
      res.status(202).json(taskUpdated);
    } catch (error) {
      next(error);
    }
  }
]);

router.patch("/:id", [
  Validate(updatePartialTaskSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const taskUpdated = await service.update(id, req.body);
      res.status(202).json(taskUpdated);
    } catch (error) {
      next(error);
    }
  }
]);

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const taskDeleted = await service.delete(id);
    res.status(200).json(taskDeleted);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

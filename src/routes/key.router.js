const express = require("express");
const Validate = require("../middlewares/validator.handler");
const {
  createKeySchema, getKeySchema,
} = require("../schemas/key.schema");
const KeyService = require("../services/key.service");

const router = express.Router();
const service = new KeyService();

router.get("/", async (req, res, next) => {
  try {
    let serviceRes = await service.get();
    res.status(200).json(serviceRes);
  } catch (error) {
    next(error);
  }
});

router.get("/:key", [
  Validate(getKeySchema, "params"),
  async (req, res, next) => {
    try {
      const { key } = req.params;
      let serviceRes = await service.find(key);
      res.status(200).json(serviceRes);
    } catch (error) {
      next(error);
    }
  }
]);

router.post("/", [
  Validate(createKeySchema, "body"),
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

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const keyDeleted = await service.delete(id);
    res.status(200).json(keyDeleted);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

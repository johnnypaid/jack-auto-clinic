const auth = require("../middleware/auth");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const { AppEntry, validate } = require("../model/entry");
const { AppProd } = require("../model/production");

router.get("/", async (req, res) => {
  const result = await AppEntry.find();
  res.send(result);
});
router.get("/:option/:key", async (req, res) => {
  console.log(req.params);

  const field = req.params.option;
  const key = req.params.key;
  let result = {};
  let count = 0;

  try {
    if (field === "engineNum") {
      result = await AppEntry.find({ engineNum: key });
    }

    if (field === "chassisNum") {
      result = await AppEntry.find({ chassisNum: key });
    }

    if (field === "containerNum") {
      result = await AppEntry.find({ containerNum: key });
    }

    if (field === "date") {
      console.log(key);
      countResult = await AppEntry.find({
        dateArrived: { $eq: new Date(key) },
      }).count();
      result = await AppEntry.find({ dateArrived: { $eq: new Date(key) } });
    }

    res.status(200).send(result);
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  let result = await AppEntry.findOne({ engineNum: req.body.engineNum });
  if (result) return res.status(400).send("Engine already exist..");

  let chasis = await AppEntry.findOne({ chassisNum: req.body.chassisNum });
  if (chasis) return res.status(400).send("Chassis number already exist..");

  try {
    console.log(req.body);

    newEntry = new AppEntry(
      _.pick(req.body, [
        "_id",
        "chassisNum",
        "engineNum",
        "bodyCode",
        "make",
        "supplier",
        "containerNum",
        "dateArrived",
        "model",
        "valve",
        "body",
        "driveType",
        "speed",
        "bodyEye",
        "color",
        "yard",
        "reconCrd",
        "company",
        "unitDesc",
      ])
    );
    const entry = await newEntry.save();

    res.send(entry);
  } catch (error) {
    res.send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  // console.log(req.body);
  // console.log(req.params.id);

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  try {
    const findEntry = await AppEntry.findByIdAndUpdate(
      req.params.id,
      {
        chassisNum: req.body.chassisNum,
        engineNum: req.body.engineNum,
        bodyCode: req.body.bodyCode,
        bodyCode: req.body.bodyCode,
        make: req.body.make,
        supplier: req.body.supplier,
        containerNum: req.body.containerNum,
        model: req.body.model,
        valve: req.body.valve,
        body: req.body.body,
        driveType: req.body.driveType,
        speed: req.body.speed,
        bodyEye: req.body.bodyEye, 
        color: req.body.color,
        yard: req.body.yard,
        reconCrd: req.body.reconCrd,
        company: req.body.company,
        unitDesc: req.body.unitDesc,
      },
      { new: true }
    );

    if (!findEntry)
      return res
        .status(404)
        .send("Cand find entry with the given engine number.");

    res.send(findEntry);
  } catch (error) {
    res.send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const delEntry = await AppEntry.findByIdAndRemove(req.params.id);

    if (!delEntry)
      return res.status(404).send("Could not delete entry with the given ID..");

    res.send(delEntry);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;

const express = require("express");
const Society = require("../models/Society");
const { auth, adminOnly } = require("../middleware/auth");

const router = express.Router();

// GET all societies
router.get("/", auth, async (req, res) => {
  try {
    const societies = await Society.find({ isActive: true }).sort({
      createdAt: -1,
    });

    res.json(societies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// CREATE society
router.post("/", auth, adminOnly, async (req, res) => {
  try {
    const society = new Society(req.body);

    await society.save();

    res.status(201).json(society);
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: err.message,
    });
  }
});

// UPDATE society
router.put("/:id", auth, adminOnly, async (req, res) => {
  try {
    const society = await Society.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!society) {
      return res.status(404).json({
        message: "Society not found",
      });
    }

    res.json(society);
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: err.message,
    });
  }
});

// DELETE society
router.delete("/:id", auth, adminOnly, async (req, res) => {
  try {
    const society = await Society.findByIdAndDelete(req.params.id);

    if (!society) {
      return res.status(404).json({
        message: "Society not found",
      });
    }

    res.json({
      message: "Society deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;
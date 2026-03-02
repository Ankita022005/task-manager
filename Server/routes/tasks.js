const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

// ================= CREATE TASK =================
router.post("/", auth, async (req, res) => {
  const { title, description } = req.body;

  try {
    const newTask = new Task({
      user: req.user.id,
      title,
      description,
    });

    const task = await newTask.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= GET ALL TASKS =================
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= UPDATE TASK =================
router.put("/:id", auth, async (req, res) => {
  const { title, description } = req.body;

  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    // Check user ownership
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= DELETE TASK =================
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await task.deleteOne();
    res.json({ msg: "Task removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
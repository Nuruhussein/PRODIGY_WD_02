const express = require("express");
const Employee = require("../models/Employee");
const auth = require("../middleware/auth");

const router = express.Router();

// Create Employee
router.post("/", auth, async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read Employees
router.get("/", auth, async (req, res) => {
  try {
    const employees = await Employee.find({ owner: req.user });
    res.json(employees);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Read Employees
router.get("/:id", auth, async (req, res) => {
  try {
    const employee = await Employee.findOne({
      _id: req.params.id,
      owner: req.user,
    });
    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update Employee
router.put("/:id", auth, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!employee) return res.status(404).send("Employee not found");
    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Employee
router.delete("/:id", auth, async (req, res) => {
  try {
    // console.log(req.params);
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).send("Employee not found");
    res.send("Employee deleted");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

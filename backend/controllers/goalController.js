const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

// ! // @desc     Get all goals
// //@route    GET /api/goals
// //@Access   Private
// const getGoals = asyncHandler(async (req, res) => {
//   const goals = await Goal.find();
//   res.status(200).json({ goals });
// });

//@desc     Get goals for user
//@route    GET /api/goals
//@Access   Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json({ goals });
});

//@desc     set goal
//@route    POST /api/goals
//@Access   Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(404);
    throw new Error("please add a text field");
  }

  const goal = await Goal.create({ text: req.body.text, user: req.user.id });

  res.status(200).json(goal);
});

//@desc     Update goal
//@route    PUT /api/goals/:id
//@Access   Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("goal not found");
  }

  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error("user not found");
  }

  // make sure only the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

//@desc     Delete goal
//@route    DELETE /api/goals/:id
//@Access   Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("goal not found");
  }

  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error("user not found");
  }

  // make sure only the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }

  await goal.remove();
  res.status(200).json({ id: `delete goal ${req.params.id}` });
});

module.exports = { getGoals, setGoal, updateGoal, deleteGoal };

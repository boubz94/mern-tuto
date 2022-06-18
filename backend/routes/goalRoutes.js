const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");
const { protect } = require("../middleware/authMiddleware");

/* A shorthand for the following: 
// router.get("/", getGoals);
// router.post("/", setGoal);
*/
router.route("/").get(protect, getGoals).post(protect, setGoal);

router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;

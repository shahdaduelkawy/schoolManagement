const express = require("express");

const {
  createSchoolValidator,
  deleteSchoolValidator,
  getSearchValidator,
} = require("../utils/validators/SchoolValidator");

const {
  UpdateSchool,
  getSchool,
  deleteSchool,
  getSearch,
  createSchool,
  searchschoolByName,
} = require("../services/SchoolService");

const authService = require("../services/authService");

const router = express.Router();

router.use(authService.protect);

// Admin
router.use(authService.allowedTo("superAdmin"));
router.route("/").get(getSchool).post(createSchoolValidator, createSchool);
router.route("/delete/:id").delete(deleteSchoolValidator, deleteSchool);
router.route("/Search/:id").get(getSearchValidator, getSearch);
router.route("/update/:id").put(UpdateSchool);

router.get("/:schoolName", searchschoolByName);




module.exports = router;

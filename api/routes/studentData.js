const multer = require("multer");
const router = require("express").Router();
const upload = multer({ dest: "uploads/" });

// Student model
const { Students } = require("../controller/index");

// Middleware function
const { checkAuth, roleAuth } = require("../middleware/auth");
const {insertDataValidation, updateValidation} = require('../validation/index');

// <---------------------------------------------CRUD APIS--------------------------------------------->
router.post(
  "/upload",
  checkAuth,
  roleAuth(["teacher", "admin"]),
  upload.single("studentData"),
  Students.uploadCsv
);
router.post(
  "/insertrow",insertDataValidation,
  checkAuth,
  roleAuth(["teacher", "admin"]),
  Students.insertRow
);
router.get(
  "/getdata",
  checkAuth,
  roleAuth(["teacher", "admin"]),
  Students.getData
);
router.get(
  "/:rollnumber",
  checkAuth,
  roleAuth(["teacher", "student", "admin"]),
  Students.getDataByRoll
);

router.patch('/:rollnumber', updateValidation ,checkAuth,roleAuth(['teacher','admin']),Students.updateStudent);

router.delete(
  "/:rollnumber",
  checkAuth,
  roleAuth(["teacher", "admin"]),
  Students.deleteByRoll
);
module.exports = router;

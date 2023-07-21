const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer({ dest: "./local_Resumes" });
const {
  applyApplicants,
  getApplicants,
  hireApplicant,
  getCountApplicant,
  getActiveEmployeeList_withoutPbms,
  updateApplicant,
  deleteApplicant,
  updateRequirements,
  getAll_Active_EmployeeList,
  employed_new_employee,
  getApplicantById,
  upload_SSS_deductions,
  uploadPhillhealth,
  uploadPagIbig,
  get_sss,
  get_philhealth,
  get_pagibig,
  addContratCategory,
  getContractCategory,
  deleteContractCategory,
  updateContractCategory,
  saveCutOff,
  getCutOff,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  getSchedule,
  getByIdSchedule,
  createEmployeeStatus,
  updateEmployeeStatus,
  viewAllEmployeeStatus,
  viewByIdEmployeeStatus,
  deleteEmployeeStatus,
} = require("../Controller/HumanResource");
const { route } = require("./AdminRoute");
const { protect } = require("../Middleware/AdminMiddleware");

router.post(
  "/applicant-form",
  upload.fields([
    { name: "picture", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  applyApplicants
);
router.get("/get-applicants/:category", getApplicants);
router.post("/hire-applicant", hireApplicant);
router.get("/getcount-applicant", getCountApplicant);
router.get("/view-placed-emp/:ID", getApplicantById); // data for placed employee
router.put("/update-applicant", updateApplicant);
router.put("/employed-new", upload.single("profile"), employed_new_employee);
//ACTIVE EMPLOYEE LIST
router.get("/get-activeemployee", getActiveEmployeeList_withoutPbms);
router.get("/get-employee-list", getAll_Active_EmployeeList);
router.delete("/delete-expire", deleteApplicant);
router.put("/update-requirements", updateRequirements);

//UPLOAD DEDUCTIONS
router.post("/upload-sss", upload_SSS_deductions);
router.get("/get-sss", get_sss);

//PHIL-HEALTH
router.post("/upload-philHealth", uploadPhillhealth);
router.get("/get-philhealth", get_philhealth);

//PAGIBIG
router.post("/upload-pagibig", uploadPagIbig);
router.get("/get-pagibig", get_pagibig);

//Employment Category
router.post("/add-employment-category", addContratCategory);
router.get("/get-employment-category", getContractCategory);
router.put("/update-employment-category/:ID", updateContractCategory);
router.delete("/delete-employment-category/:ID", deleteContractCategory);

//TIMEKEEPING
router.post("/save-cutoff", saveCutOff);
router.get("/get-cutdata", getCutOff);
//Employee SCHEDULE
router.get("/view-all-schedule", getSchedule);
router.get("/view-byID-schedule/:ID", getByIdSchedule);
router.post("/create-schedule", createSchedule);
router.put("/update-schedule/:ID", updateSchedule);
router.delete("/delete-schedule/:ID", deleteSchedule);

//Employee Status
router.get("/viewAll-empStatus", viewAllEmployeeStatus);
router.get("/viewById-empStatus/:ID", viewByIdEmployeeStatus);
router.post("/create-empStatus", createEmployeeStatus);
router.put("/update-empStatus/:ID", updateEmployeeStatus);
router.delete("/delete-empStatus/:ID", deleteEmployeeStatus);

module.exports = router;

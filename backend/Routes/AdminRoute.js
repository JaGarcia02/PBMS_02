const express = require("express");
const {
  createAdmin,
  loginAdmin,
  getToken,
  logout,
  checkAdmin,
  extra_login,
  setBranding,
  getBRanding,
  setOfficers,
  getOfficers,
  removeOfficer,
  set_admin_settings,
  get_admin_settings,
  forgot_password_admin,
  account_recovery,
  getEmployeeInfo,
  remove_global,
  get_admin,
  get_sections,
  adminSectionStatus,
  deleteSection,
  updateSection,
  get_auth,
  create_Auth,
  updateAuth,
  createPositionPRF,
  deletePositionPRF,
  updatePositionPRF,
  viewAllPRFrequest,
  viewOnePRFrequest,
  get_notifications,
  updateClick,
  updateKeyOfficers,
  approvePrf,
} = require("../Controller/Admin");
const router = express.Router();
const { protect } = require("../Middleware/AdminMiddleware");
const multer = require("multer");
const {
  upload_form,
  get_form,
  delete_form,
} = require("../Controller/SystemForms");
const brand_logo = multer({ dest: "./local_Brandings" });
const form_upload = multer({ dest: "./local_Forms" });

//  ADMIN FUNCTIONS
router.post("/create-admin", createAdmin);
router.post("/login-admin", loginAdmin);
router.post("/checkToken", getToken);
router.get("/logout", logout);
router.get("/checkAdmin", checkAdmin);
router.post("/extra-login", extra_login);

//FORGOT PASSWORD ADMIN
router.post("/forgot-admin", forgot_password_admin);
router.put("/recover-password", account_recovery);

//BRANDING PAGE
router.post("/upload", brand_logo.single("logo"), setBranding);
router.get("/getBrand", getBRanding);
router.post("/setOfficer", setOfficers);
router.put("/updateOfficer/:id", updateKeyOfficers);
router.get("/getOfficers", getOfficers);
router.get("/remove/:ID", removeOfficer);
router.delete("/remove-admin/:ID", protect, remove_global);
router.get("/get-admin", get_admin);

//SETTINGS
router.post("/setup_setting", set_admin_settings);
router.get("/get-setting", get_admin_settings);

//REGISTERING ACTIVE EMPLOYEE
router.post("/get-employee", getEmployeeInfo);

//ADMIN SECTION STATUS
router.get("/get-section", get_sections);
router.post("/add-section-status", adminSectionStatus);
router.put("/update-section/:admin_sectionName", updateSection);
router.delete("/remove-section/:admin_sectionName", deleteSection);

//ADMIN AUTHORIZATION
router.get("/get-authorization", get_auth);
router.get("/create-auth", create_Auth);
router.put("/update-auth", updateAuth);

//ADMIN PRF
router.post("/create-position-request", createPositionPRF);
router.delete("/delete-position-request/:ID", deletePositionPRF);
router.put("/update-position-prf/:ID", updatePositionPRF);
router.get("/view-all-prf-request", viewAllPRFrequest);
router.get("/view-prf-request/:ID", viewOnePRFrequest);
router.put("/approved-prf", approvePrf);

//ADMIN NOTIFICATIONS
router.get("/get-admin-notif", get_notifications);
router.put("/update-notif", updateClick);

//ADMIN FORMS - THE CONTROLLER IS ON THE "SystemForms.js"
router.post("/create-form", form_upload.single("file"), upload_form);
router.get("/get-forms/:sort", get_form);
router.delete("/delete-form/:ID", delete_form);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  insertUsers,
  resetAccount,
  SuspendAccount,
  UnsuspendAccount,
  ActivateAccount,
  EditAccount,
  request_reset,
  change_password_forgot,
  create_user,
  login_user,
  logout_user,
  validateToken,
  change_password_loggedIn,
  getToken,
  DeactivateAccount,
  deleteDefault,
  update_onlineStatus,
  get_notifications,
} = require("../Controller/Users");
const { protect } = require("../Middleware/AdminMiddleware");

//USER REGISTRATION AND FILTER
router.post("/create-user", protect, create_user);
router.post("/login-user", login_user);
router.get("/checkAll/:SortItem", protect, getAllUsers);
router.post("/setItems", insertUsers);

//USER MANIPULATION
router.get("/logout-user/:id", logout_user);
router.put("/reset-account", protect, resetAccount);
router.put("/suspend-account", protect, SuspendAccount);
router.put("/unsuspend-account", protect, UnsuspendAccount);
router.put("/activate-user", protect, ActivateAccount);
router.put("/edit-user", protect, EditAccount);
router.post("/request-forgot", request_reset);
router.put("/change-password", change_password_forgot);
router.post("/validate-token", validateToken);
router.put("/auth-changepassword", protect, change_password_loggedIn);
router.post("/checkToken", getToken);
router.put("/deactivate-user", protect, DeactivateAccount);

//GET USER NOTIFICATION
router.get("/get-notif/:role/:dept", get_notifications);

router.delete("/delete-default/:empID", protect, deleteDefault);

router.get("update_online_stat", update_onlineStatus);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  add_requestor,
  get_request,
  valid_cancel_request,
  approve_form,
} = require("../Controller/SystemForms");

router.post("/add-request", add_requestor);
router.get("/get-request", get_request);
router.put("/valid-cancel", valid_cancel_request);
router.put("/approve-form", approve_form);

module.exports = router;

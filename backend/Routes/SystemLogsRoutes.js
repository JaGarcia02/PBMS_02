const express = require("express");
const { addsystemlogs, getsystemlogs } = require("../Controller/SystemLogs");

const router = express.Router();

router.post("/add-system-logs", addsystemlogs);
router.get("/get-logs/:employee_ID", getsystemlogs);

module.exports = router;

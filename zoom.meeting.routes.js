const express = require("express");
const router = express.Router();

const { createZoomMeeting } = require("../controllers/zoom.meeting.controller");


router.post("/create-meeting",  createZoomMeeting);
// router.get("/create-zoom-token", createZoomToken);

module.exports = router;

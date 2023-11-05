const express = require("express");
const validate = require("../middlewares/validate");
const videoValidation = require("../validations/video.validation");
const videoController = require("../controllers/video.controller");

const router = express.Router();

router.get("/", validate(videoValidation.searchVideos), videoController.getAllVideos);
router.get("/:videoId",validate(videoValidation.getVideoId), videoController.getVideoId);
router.post("/", validate(videoValidation.AddVideo), videoController.AddVideo);
router.patch("/:videoId/votes", validate(videoValidation.updateVote), videoController.updateVote);
router.patch("/:videoId/views", validate(videoValidation.updateView), videoController.updateView);

module.exports = router;
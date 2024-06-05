const axios = require("axios");
const qs = require("qs");
const { zoomToken, zoomMeeting } = require("../models/zoom.meeting.model");
require("dotenv").config({
  path: "./config/config.env",
});

/**
 * Create zoom token for the meeting
 * @param {*} req
 * @param {*} res
 * @returns
 */

async function generateZoomToken() {
  const request = await axios.post(
    process.env.ZOOM_OAUTH_ENDPOINT,
    qs.stringify({ grant_type: "account_credentials", account_id: process.env.ZOOM_ACCOUNT_ID }),
    {
      headers: {
        Authorization: `Basic ${Buffer.from(`${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`).toString(
          "base64"
        )}`,
      },
    }
  );

  if (!request.data?.access_token) {
    throw new Error("Failed to obtain Zoom token");
  }

  await zoomToken.findOneAndUpdate({}, { zoom_token: request.data?.access_token }, { upsert: true, new: true });
  return request.data?.access_token;
}

// Function to get a valid Zoom token
async function getZoomToken() {
  const findToken = await zoomToken.findOne({});
  let token = findToken?.zoom_token;

  if (!token) {
    token = await generateZoomToken();
  }

  return `Bearer ${token}`;
}

// Main logic to create a Zoom meeting
async function createZoomMeeting(req, res) {
  try {
    const token = await getZoomToken();

    const { topic, start_time, duration, agenda } = req.body;
    const response = await axios.post(
      "https://api.zoom.us/v2/users/me/meetings",
      {
        topic,
        type: 2,
        start_time,
        duration,
        timezone: new Date().toISOString(), // Ensure the correct format
        agenda,
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: true,
          mute_upon_entry: true,
          watermark: false,
          use_pmi: false,
          approval_type: 0,
          audio: "both",
          auto_recording: "none",
        },
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    const body = response.data;
    const meetingCreated = await zoomMeeting.create(body);

    if (meetingCreated) {
      return res.status(200).json({
        success: true,
        status: 200,
        message: "Meeting is created successfully",
        data: body,
      });
    } else {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Error, In creating the meeting",
        data: {},
      });
    }
  } catch (error) {
    console.log("🚀 ~ exports.createMeeting= ~ error:", error.message);

    if (error.response && error.response.status === 401) {
      // Token might be invalid or expired, generate a new token and retry
      try {
        const newToken = await generateZoomToken();
        const token = `Bearer ${newToken}`;

        const { topic, start_time, duration, agenda } = req.body;
        const response = await axios.post(
          "https://api.zoom.us/v2/users/me/meetings",
          {
            topic,
            type: 2,
            start_time,
            duration,
            timezone: new Date().toISOString(),
            agenda,
            settings: {
              host_video: true,
              participant_video: true,
              join_before_host: true,
              mute_upon_entry: true,
              watermark: false,
              use_pmi: false,
              approval_type: 0,
              audio: "both",
              auto_recording: "local",
            },
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );

        const body = response.data;
        const meetingCreated = await zoomMeeting.create(body);

        if (meetingCreated) {
          return res.status(200).json({
            success: true,
            status: 200,
            message: "Meeting is created successfully",
            data: body,
          });
        } else {
          return res.status(400).json({
            success: false,
            status: 400,
            message: "Error, In creating the meeting",
            data: {},
          });
        }
      } catch (retryError) {
        return res.status(STATUS_CODE.SERVER_ERROR).json({
          success: false,
          status: STATUS_CODE.SERVER_ERROR,
          error: ERRORS.INVALID.AN_ERROR_OCCURED,
          message: retryError.message,
        });
      }
    }
    return res.status(STATUS_CODE.SERVER_ERROR).json({
      success: false,
      status: STATUS_CODE.SERVER_ERROR,
      error: ERRORS.INVALID.AN_ERROR_OCCURED,
      message: error.message,
    });
  }
}

module.exports = { createZoomMeeting };

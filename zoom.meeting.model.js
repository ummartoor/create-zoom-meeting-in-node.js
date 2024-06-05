const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const meetingSchema = new Schema(
  {
    uuid: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    host_id: {
      type: String,
      required: true,
    },
    host_email: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    type: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    start_time: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    timezone: {
      type: String,
      required: true,
    },
    agenda: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
      required: true,
    },
    start_url: {
      type: String,
      required: true,
    },
    join_url: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    h323_password: {
      type: String,
      required: true,
    },
    pstn_password: {
      type: String,
      required: true,
    },
    encrypted_password: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

const zoomTokenSchema = new Schema(
  {
    zoom_token: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const zoomToken = mongoose.model("zoomToken", zoomTokenSchema);

const zoomMeeting = mongoose.model("zoomMeeting", meetingSchema);

module.exports = { zoomToken, zoomMeeting };

const express = require("express");
const http = require("http");
const cors = require("cors");
const path = require("path");

const dotenv = require("dotenv");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");


// Load environment variables
dotenv.config({ path: "./config/config.env" });

const app = express();
const port = normalizePort(process.env.PORT || 5000);

// Middlewares
app.use(cors({ origin: "*" }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Set port
app.set("port", port);


const meetingRouter = require("./routes/zoom.meeting.routes");



 
app.use("/api/meeting", meetingRouter);

// Error handling middleware
app.use((req, res) => {
  res.status(404).json({
    success: false,
    status: 404,
    message: "Page not found",
  });
});

app.use((err, req, res, next) => {
  if (err instanceof MongoNetworkError) {
    res.status(500).json({ error: "MongoDB network error" });
  } else {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Normalize port function
function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}

// Start server and connect to database
async function onListening() {
  await connectDb();
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log(`Server is running on port ${port}`);
  debug("Listening on " + bind);
}



server.listen(port);
server.on("listening", onListening);


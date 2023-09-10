const express = require("express");
const moment = require("moment");
var cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());

app.get("/api", (req, res) => {
  const { slack_name, track } = req.query;

  if (!slack_name || !track) {
    return res.status(400).json({
      error: "slack_name and track are required query parameters",
    });
  }

  const currentDay = moment().utc().format("dddd");
  const utcTime = moment().utc().format("YYYY-MM-DDTHH:mm:ss[Z]");

  const response = {
    slack_name,
    current_day: currentDay,
    utc_time: utcTime,
    track,
    github_file_url:
      "https://github.com/ndukwesamuel/hng-backend/blob/master/index.js",
    github_repo_url: "https://github.com/ndukwesamuel/hng-backend",
    status_code: 200,
  };

  res.json(response);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

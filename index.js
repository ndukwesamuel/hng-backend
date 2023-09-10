const express = require("express");
const moment = require("moment");

const app = express();
const port = process.env.PORT || 4000;

app.get("/api", (req, res) => {
  const { slack_name, track } = req.query;

  // Validate required query parameters
  if (!slack_name || !track) {
    return res
      .status(400)
      .json({ error: "slack_name and track are required query parameters" });
  }

  // Get the current day of the week and UTC time
  const currentDay = moment().utc().format("dddd");
  const utcTime = moment().utc().format("YYYY-MM-DDTHH:mm:ss[Z]");

  // Construct the JSON response
  const response = {
    slack_name,
    current_day: currentDay,
    utc_time: utcTime,
    track,
    github_file_url: "https://github.com/username/repo/blob/main/file_name.ext",
    github_repo_url: "https://github.com/username/repo",
    status_code: 200,
  };

  res.json(response);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

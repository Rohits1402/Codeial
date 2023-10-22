const fs = require("fs");
const rfs = require("rotating-file-stream");
const path = require("path");

const logDirectory = path.join(__dirname, "../production_logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("access.log", {
  //access.log is the file where log will be stored
  interval: "1d",
  path: logDirectory,
});
const development = {
  name: "development",

  asset_path: "/assets",
  session_cookie_key: "blahsomething",
  db: "mongodb+srv://rschauhan1402:rohit2001@cluster0.l6lgral.mongodb.net/",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "rschauhan1402@gmail.com",
      pass: "pzvb pels mzxt aoet",
    },
  },
  google_client_id:
    "363341655295-9mu20sefbns3hq5iavahdq0us25cno69.apps.googleusercontent.com",
  google_client_secret: "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",
  google_callback_URL: "http://localhost:8000/users/auth/google/callback",
  jwt_secret: "codeial",
  morgan: {
    mode: "dev",
    options: { stream: accessLogStream },
  },
};
const production = {
  name: "production",
  asset_path: process.env.CODEIAL_ASSET_PATH,
  session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
  db: process.env.CODEIAL_DB,
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.CODEIAL_GMAIL_USERNAME,
      pass: process.env.CODEIAL_EMAIL_PASSWORD,
    },
  },
  google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
  google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
  google_call_back_url: process.env.CODEIAL_GOOGLE_CLIENT_URL,
  jwt_secret: process.env.CODEIAL_JWT_SECRET,
  morgan: {
    mode: "combined",
    options: { stream: accessLogStream },
  },
};

module.exports =
  eval(process.env.CODEIAL_ENVIRONMENT) == undefined
    ? development
    : eval(process.env.CODEIAL_ENVIRONMENT);

//module.exports = development;

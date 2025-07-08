const express = require("express");
const proxy = require("express-http-proxy");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(
  "/auth",
  proxy(process.env.AUTH_SERVICE_URL, {
    proxyReqPathResolver: (req) => `/api/auth${req.url}`,
  })
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API Gateway en écoute sur le port ${PORT}`);
});

const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", async (req, res) => {
  const url = `${process.env.AUTH_SERVICE_URL}/api/auth${req.url}`;
  console.log(`[Gateway] ${req.method} => ${url}`);
  console.log("[Gateway] Body reçu :", req.body);
  console.log("[Gateway] Appel reçu de :", req.headers['user-agent'] || 'inconnu');

  try {
    const response = await axios({
      method: req.method,
      url,
      headers: {
        "Content-Type": "application/json", // NE PAS inclure ...req.headers ici
      },
      data: req.body,
    });

    console.log("[Gateway] ✅ Réponse OK");
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("[Gateway] ❌ ERREUR :", error.message);

    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ message: "Erreur interne Gateway" });
    }
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚪 API Gateway en écoute sur le port ${PORT}`);
});

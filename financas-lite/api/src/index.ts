import "dotenv/config";
import express from "express";
import cors from "cors";
import router from "./routes";
import { auth } from "./middlewares/auth";

const app = express();
const port = Number(process.env.PORT) || 3000;
const WEB_ORIGIN = process.env.WEB_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: WEB_ORIGIN }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString(), service: "Lite Finance API" });
});

// tudo abaixo exige auth (Bearer <access_token> do Supabase)
// para dev, você pode setar DEV_FAKE_USER_ID no .env e ele pula o token
app.use(auth, router);

app.listen(port, () => {
  console.log(`API on http://localhost:${port}`);
});

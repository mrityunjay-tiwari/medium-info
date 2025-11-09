import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import { getArticleInfo, getAuthorAvatar } from "medium-info-api";

const app = express();
app.use(cors());

app.get("/medium", async (req, res) => {
  const url = req.query.url as string;

  if (!url) {
    return res.status(400).json({ error: "Missing url parameter" });
  }

  try {
    const result = await getArticleInfo(url);
    console.log("result , ", result);
    return res.json({ success: true, data: result, message: "For authorAvatar, visit : https://localhost:3000/medium/avatar?url=<medium_article_url>" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to fetch article", error: err });
  }
});

app.get("/medium/avatar", async (req, res) => {
  const url = req.query.url as string;

  if (!url) {
    return res.status(400).json({ error: "Missing url parameter" });
  }

  try {
    const result = await getAuthorAvatar(url);
    console.log("result , ", result);
    return res.json({ success: true, data: result, message: "For all other informations, visit : https://localhost:3000/medium?url=<medium_article_url>" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to fetch author avatar", error: err });
  }
});

export const handler = serverless(app);

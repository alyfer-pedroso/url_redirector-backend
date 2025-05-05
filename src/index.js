import { nanoid } from "nanoid";

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import pool from "./database/index.js";

const app = express();

app.use(
  cors({
    origin: "https://url-redirector-frontend.vercel.app/",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Accept, Authorization",
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const originalUrl = await pool.query("SELECT original_url FROM urls WHERE id = $1", [id]);
    res.status(200).redirect(originalUrl.rows[0].original_url);
  } catch (error) {
    res.status(500).send("<p>This short url does not exist!</p>");
  }
});

app.post("/createShortUrl", async (req, res) => {
  const { original_url } = req.body;

  try {
    let id;
    let exists = true;

    while (exists) {
      id = nanoid(10);
      const check = await pool.query("SELECT 1 FROM urls WHERE id = $1", [id]);
      exists = check.rows.length > 0;
    }

    await pool.query("INSERT INTO urls (id, original_url) VALUES ($1, $2)", [id, original_url]);

    const new_url = `${req.protocol}://${req.get("host")}/${id}`;
    res.status(200).send({ new_url });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong, please try again!" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

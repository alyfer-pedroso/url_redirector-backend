import express from "express";
import { nanoid } from "nanoid";

import supabase from "../database/index.js";

export const urls = express.Router();

urls.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from("urls").select("original_url").eq("id", id);
    if (error) throw error;
    res.status(200).redirect(data[0].original_url);
  } catch (error) {
    res.status(500).send("<p>This short url does not exist!</p>");
  }
});

urls.post("/createShortUrl", async (req, res) => {
  const { original_url } = req.body;

  try {
    let id;
    let exists = true;

    while (exists) {
      id = nanoid(10);
      const { data, error } = await supabase.from("urls").select("id", 1).eq("id", id);
      if (error) throw error;
      exists = data.length > 0;
    }

    await supabase.from("urls").insert([{ id, original_url }]);

    const new_url = `${req.protocol}://${req.get("host")}/${id}`;
    res.status(200).send({ new_url });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong, please try again!" });
  }
});


import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import "dotenv/config";

const app = express();
app.use(bodyParser.json());

const token = process.env.WHATSAPP_TOKEN;
const phoneId = process.env.PHONE_NUMBER_ID;

app.get("/", (req,res)=>res.send("Bot running"));

app.post("/webhook", async (req,res)=>{
  console.log(JSON.stringify(req.body,null,2));
  res.sendStatus(200);
});

app.get("/webhook", (req,res)=>{
  const mode = req.query["hub.mode"];
  const challenge = req.query["hub.challenge"];
  const verify = req.query["hub.verify_token"];
  if(mode && verify === "banya123") return res.status(200).send(challenge);
  res.sendStatus(403);
});

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, ()=>console.log("Bot started on " + PORT));

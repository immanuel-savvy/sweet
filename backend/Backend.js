import express from "express";
import cors from "cors";
import ds_conn from "./ds/conn";
import router from "./routes";
import bodyParser from "body-parser";
import { create_default_admin } from "./handlers/starter";

const app = express();
app.use(cors());
app.use(express.static(__dirname + "/assets"));
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));
app.use(bodyParser.json({ limit: "100mb" }));

router(app);

app.get("/", (req, res) =>
  res.send("<div><h1>Hi, its SWEET Foundation.</h1></div>")
);

app.listen(1450, () => {
  ds_conn();

  create_default_admin();

  console.log("SWEET Backend started on :1450");
});

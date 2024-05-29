import * as express from "express";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import path = require("path");
import * as cors from "cors";
import router from "./app/routes/index.routes";
import mongoose from "mongoose";
import { eSuccessMessage } from "./app/enum/success-message.enum";
import { eErrorMessage } from "./app/enum/error-message.enum";

dotenv.config();

// create express app
const app = express();
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(cors());
app.use("/api/v1", router);
app.use("/api/v1/images", express.static(path.join("images")));

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.aj57lt4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log(eSuccessMessage.DbSuccessMessage);
  })
  .catch((err) => {
    console.log(eErrorMessage.DbErrorMessage, err);
    process.exit();
  });

app.listen(process.env.NODE_PORT, () => {
  console.log(`Server is listening on port ${process.env.NODE_PORT}`);
});

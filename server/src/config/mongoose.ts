import mongoose from "mongoose";

import { dbUri } from "./secrets";

mongoose.set("strictQuery", true);
mongoose
  .connect(dbUri, {})
  .then(() => {
    console.log("Sucessfull connection with MongoDB.");
  })
  .catch((error: Error) => {
    console.log(error);
  });

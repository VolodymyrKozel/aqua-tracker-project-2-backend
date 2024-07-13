// import mongoose from "mongoose";
// import { env } from "../utils/env.js";
// import { ENV_VARS } from "../constants/index.js";

// export const initMongoConnection = async () => {
//   const connectionLink = `mongodb+srv://${env(ENV_VARS.MONGODB_USER)}:${env(
//     ENV_VARS.MONGODB_PASSWORD
//   )}@${env(ENV_VARS.MONGODB_URL)}/${env(
//     ENV_VARS.MONGODB_DB
//   )}?retryWrites=true&w=majority&appName=Cluster0`;
//   try {
//     await mongoose.connect(connectionLink);
//     console.log("Mongo connection successfully established!");
//   } catch (err) {
//     console.log("Error while setting up mongo connection");
//     throw err;
//   }
// };

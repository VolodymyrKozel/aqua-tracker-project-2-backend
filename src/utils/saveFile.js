import { ENV_VARS } from "../constants/index.js";
import { env } from "./env.js";
import { saveFileToUploadDir } from "./saveFileToUploadDir.js";
import { saveFileToCloudinary } from "./saveFileToCloudinary.js";

export const saveFile = async (file) => {
  if (!file) return;

  let url;
  if (env(ENV_VARS.IS_CLOUDINARY_ENABLED) === "true") {
    url = await saveFileToCloudinary(file);
  } else {
    url = await saveFileToUploadDir(file);
  }

  return url;
};

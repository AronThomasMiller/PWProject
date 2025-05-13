import dotenv from "dotenv";

dotenv.config();

export const config = {
  weburl: process.env.WEB_URL!,
  useremail: process.env.USER_EMAIL!,
  userpassword: process.env.USER_PASSWORD!,
  username: process.env.USER_NAME!,
};

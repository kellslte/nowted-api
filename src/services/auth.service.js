import User from "../models/user.model.js";
import { ApplicationError } from "../helpers/error.helper.js";
import argon from "argon2";
import { getUserFolders } from "./folder.service.js";
import { sign } from "./jwt.service.js";
import { generateResetToken } from "../helpers/index.js";
import PasswordReset from "../models/password-reset.model.js";

export const register = async function (payload) {
  // check if the acocunt already exists
  const existingUser = await User.findOne({ email: payload.email });

  if (existingUser)
    throw new ApplicationError("User record already exists", 400);

  const hash = await argon.hash(payload.password);

  const user = await User.create({
    name: payload.name,
    email: payload.email,
    password: hash,
  });

  /* 
    take the input from the user and hash it
    "a super secret password" = "argih28793bjikuhsdfake$ijoiahioh8ughsdfnk#njiasoifdhiedofe$ijf"
    then store the hash in the database
    */

  return await user.save();
};

export const login = async function (payload) {
  // check if the user exists
  const { email, password } = payload;

  const user = await User.findOne({ email }).select("email password");

  if (!user) throw new ApplicationError("User record not found", 404);

  // validate the password
  if (!(await argon.verify(user.password, password))) {
    //   we take the user input, hash it, then compare the hash with what we have in the database
    throw new ApplicationError(
      "Invalid credentials, check your email or password",
      401
    );
  }

  const folders = await getUserFolders(user);

  // return a token to the user
  const auth = {
    sub: user.id,
    name: user.name,
    email: user.email,
    folders: folders,
  };

  return sign(auth);
};

export const generateUserResetToken = async function (payload) {
  // get the user record
  const user = await User.findOne({ email: payload.email });

  if (!user) throw new ApplicationError("User record not found", 404);

  const token = generateResetToken();

  const resetRecord = await PasswordReset.create({
    user: user,
    resetToken: await argon.hash(token.toString()),
  });

  await resetRecord.save();

  return {
    token,
    user,
  };
};

export const resetPassword = async function (payload) {
  const { token, email, password } = payload;

  // ensure the user record exists
  const user = await User.findOne({ email });

  if (!user) throw new ApplicationError("User record not found", 404);

  // get the password reset record
  const resetRecord = await PasswordReset.findOne({ user });

  if (!resetRecord || argon.verify(resetRecord.resetToken, token.toString()))
    throw new ApplicationError("Invalid token", 400);

  const hash = argon.hash(password);

  user.password = hash;
  await user.save();

  await PasswordReset.findOneByIdAndDelete(resetRecord.id);

  return true;
};

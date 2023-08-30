import * as userService from "./user.service.js";
import { ApplicationError } from "../helpers/error.helper.js";
import Folder from "../models/folder.model.js";

// createFolder, updateFolder, addNoteToFolder, removeNoteFromFolder
export const getUserFolders = async function (payload) {
  // get the user folders
  const user = await userService.getUser(payload.id);

  if (!user) throw new ApplicationError("User not found", 404);

  // get the user folders
  const folders = await Folder.find({ user: user.id }).populate("notes").exec();

  return folders;
};

export const getFolder = async function (payload) {
  const folder = await Folder.findById(payload);

  return folder;
};

export const createFolder = async function (payload) {
  // get the user
  const user = await userService.getUser(payload.id);

  if (!user) throw new ApplicationError("User not found", 404);

  const folder = await Folder.create({
    user: user,
    name: payload.folderName,
  });

  return folder;
};

export const updateFolder = async function (payload) {
  const { id, folderName } = payload;

  const folder = await Folder.findById(id);

  folder.name = folderName;

  await folder.save();

  return folder;
};

export const addNoteToFolder = async function ( payload )
{
  const { id, note } = payload;
  
  await Folder.findByIdAndUpdate( id, {
    $push: {
      notes: note
    }
  } );
 }

export const deleteFolder = async function (payload) {
  await Folder.findOneAndRemove({ _id: payload.id });
};

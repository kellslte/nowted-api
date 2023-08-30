import Note from "../models/note.model.js";
import * as folderService from "./folder.service.js";
// to be filled in by Ramsey
// createNote, UpdateNote, DeleteNote, getNote, getNotes

export const getAllNotes = async function (user) {
  const notes = await Note.find({
    archived: false,
    trashed: false,
  });

  return notes.filter((note) => note.folder.user !== user);
};

export const getNote = async function (id) {
  const note = await Note.findById(id).populate("folder");

  return note;
};

export const createNote = async function (payload) {
  const note = await Note.create(payload);

  // add the note to the folder
  await folderService.addNoteToFolder({
    id: payload.folder,
    note,
  });

  return note;
};

export const updateNote = async function (payload) {
  const { id, title, body, folder } = payload;

  const note = await Note.findByIdAndUpdate(
    id,
    {
      title: title,
      body: body,
      folder: folder,
    },
    { new: true }
  );

  return note;
};

export const getFavouriteNotes = async function (user) {
  const notes = await Note.find({
    favourited: true,
  });

  return notes.filter((note) => note.folder.user !== user);
};

export const addToFavourites = async function (id) {
  const note = await Note.findByIdAndUpdate(
    id,
    {
      favourited: true,
    },
    { new: true }
  );

  return note;
};

export const removeFromFavourites = async function (id) {
  const note = await Note.findByIdAndUpdate(
    id,
    {
      favourited: false,
    },
    { new: true }
  );

  return note;
};

export const getArchivedNotes = async function ( id )
{
     const notes = await Note.find({
       archived: true,
     });

     return notes.filter((note) => note.folder.user !== user);
 }

export const archiveNote = async function (id) {
  const note = await Note.findByIdAndUpdate(
    id,
    {
      archived: true,
    },
    { new: true }
  );

  return note;
};

export const unarchiveNote = async function (id) {
  return await Note.findByIdAndUpdate(
    id,
    {
      archived: false,
    },
    { new: true }
  );
};

export const getTrashedNotes = async function () {
    const notes = await Note.find( {
      trashed: true
    });

  return notes.filter((note) => note.folder.user !== user);
};

export const trashNote = async function (id) {
  return await Note.findByIdAndUpdate(
    id,
    {
      trashed: true,
    },
    { new: true }
  );
};

export const restoreNote = async function (id) {
 return await Note.findByIdAndUpdate(
    id,
    {
      trashed: false,
    },
    { new: true }
  );
};

export const deleteNote = async function (id) {
  return await Note.findOneAndRemove({ _id: id });
};

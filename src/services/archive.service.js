import * as noteService from "./note.service.js";

export const getTrashedNotes = async function (user) {
  return await noteService.getTrashedNotes(user);
};

export const trashNote = async function (note) {
  return await noteService.trashNote(note);
};

export const restoreNote = async function (note) {
  return await noteService.restoreNote(note);
};

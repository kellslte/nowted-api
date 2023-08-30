import * as noteService from './note.service.js'

export const getArchivedNotes = async function (user) {
  return await noteService.getArchivedNotes(user);
};

export const archiveNote = async function (note) {
  return await noteService.archiveNote(note);
};

export const unarchiveNote = async function (note) {
  return await noteService.unarchiveNote(note);
};
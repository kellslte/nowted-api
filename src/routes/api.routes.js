import { Router } from "express";
import { login, register, requestPasswordReset, resetPassword } from "../controllers/auth.controller.js";
import { createNote, deleteNote, getNote, getNotes, updateNote } from "../controllers/note.controller.js";
import { createFolder, deleteFolder, getFolder, getFolders, updateFolder } from "../controllers/folder.controller.js";
import { addItemToArchive, getArchivedItems, removeItemFromArchive } from "../controllers/archive.controller.js";
import { addItemToFavourites, clearFavourites, getFavouriteNotes, removeItemFromFavourites } from "../controllers/favourite.controller.js";
import { addNoteToTrash, clearTrash, getTrashedNotes, removeNoteFromTrash } from "../controllers/trash.controller.js";
const router = Router();

// auth routes
router.post( '/auth/register', register );
router.post( '/auth/login', login );
router.post( '/auth/forgot-password', requestPasswordReset );
router.post('/auth/reset-password', resetPassword );

// note routes
router.get( '/notes', getNotes );
router.get( '/notes/:id', getNote );
router.post( '/notes', createNote );
router.put( '/notes/:id', updateNote );
router.delete( '/notes/:id', deleteNote );

// folder routes
router.get( '/folders', getFolders );
router.get( '/folders/:id', getFolder );
router.post( '/folders', createFolder );
router.put( '/folders/:id', updateFolder );
router.delete( '/folders/:id', deleteFolder );

// archive routes
router.get( '/archive/notes', getArchivedItems );
router.post( '/archive/notes/:id', addItemToArchive );
router.delete( '/archive/notes/:id', removeItemFromArchive );

// favourite routes
router.get( '/favourites', getFavouriteNotes );
router.post( '/favourites/:id', addItemToFavourites );
router.delete( '/favourites/notes/:id', removeItemFromFavourites );
router.delete( '/favourites', clearFavourites );

// trash routes
router.get( "/trash", getTrashedNotes );
router.post( '/trash/notes/:id', addNoteToTrash );
router.delete( '/trash/notes/:id', removeNoteFromTrash );
router.delete( '/trash', clearTrash );


export default router;
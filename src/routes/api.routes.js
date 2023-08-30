import { Router } from "express";
import { login, register, requestPasswordReset, resetPassword } from "../controllers/auth.controller.js";
import { createNote, deleteNote, getNote, getNotes, updateNote } from "../controllers/note.controller.js";
import { createFolder, deleteFolder, getFolder, getFolders, updateFolder } from "../controllers/folder.controller.js";
import { addItemToArchive, getArchivedItems, removeItemFromArchive } from "../controllers/archive.controller.js";
import { addItemToFavourites, getFavouriteNotes, removeItemFromFavourites } from "../controllers/favourite.controller.js";
import { addNoteToTrash, getTrashedNotes, removeNoteFromTrash } from "../controllers/trash.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
const router = Router();

// auth routes
router.post( '/auth/register', register );
router.post( '/auth/login', login );
router.post( '/auth/forgot-password', requestPasswordReset );
router.post('/auth/reset-password', resetPassword );

// note routes
router.get("/user/notes", authMiddleware, getNotes);
router.get("/user/notes/:note", authMiddleware, getNote);
router.post("/user/notes/:folder", authMiddleware, createNote);
router.put("/user/notes/:note", authMiddleware, updateNote);
router.delete("/user/notes/:note", authMiddleware, deleteNote);

// folder routes
router.get( '/user/folders', authMiddleware, getFolders );
router.get( '/user/folders/:folder', authMiddleware, getFolder );
router.post("/user/folders", authMiddleware, createFolder);
router.put("/user/folders/:folder", authMiddleware, updateFolder);
router.delete("/user/folders/:folder", authMiddleware, deleteFolder);

// archive routes
router.get("/user/archive/notes", authMiddleware, getArchivedItems);
router.post("/user/archive/notes/:note", authMiddleware, addItemToArchive);
router.delete("/user/archive/notes/:note", authMiddleware, removeItemFromArchive);

// favourite routes
router.get("/user/favourites/notes", authMiddleware, getFavouriteNotes);
router.post(
  "/user/favourites/notes/:note",
  authMiddleware,
  addItemToFavourites
);
router.delete(
  "/user/favourites/notes/:note",
  authMiddleware,
  removeItemFromFavourites
);

// trash routes
router.get("/user/trash", authMiddleware, getTrashedNotes);
router.post("/user/trash/notes/:id", authMiddleware, addNoteToTrash);
router.delete("/user/trash/notes/:id", authMiddleware, removeNoteFromTrash);


export default router;
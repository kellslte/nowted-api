import { ApplicationError } from '../helpers/error.helper.js';
import * as folderService from './folder.service.js';
import * as noteService from './note.service.js';

export const getAllFavourites = async function (user )
{ 
    const favourites = await noteService.getFavouriteNotes( user );
    
    return favourites;
}

export const addNoteToFavourites = async function ( note )
{
    return await noteService.addToFavourites( note );
}

export const removeNoteFromFavourites = async function ( note )
{
    return await noteService.removeFromFavourites( note );
}
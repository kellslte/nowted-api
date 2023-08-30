import asyncWrapper from "../helpers/async-wrapper.helper.js";
import { ApplicationError } from "../helpers/error.helper.js";
import * as noteService from '../services/note.service.js';

export const getNotes = asyncWrapper( async ( req, res ) =>
{
    const notes = await noteService.getAllNotes(req.user.sub);

    return res.status( 200 ).json( {
        success: true,
        message: 'Notes were successfully retrieved',
        data: {
            notes: notes
        }
    })
 } );

export const getNote = asyncWrapper( async ( req, res ) =>
{ 
    const note = await noteService.getNote( req.params.note );

    if ( !note ) throw new ApplicationError( "Note not found", 404 );

    return res.status( 200 ).json( {
        success: true,
        message: 'Note was successfully retrieved',
        data: {
            note: note
        }
    });
} );

export const createNote = asyncWrapper( async ( req, res ) =>
{
    const { folder } = req.params;

    const { title, body } = req.body;
    
    const note = await noteService.createNote( {
        folder,
        title,
        body
    } );

    return res.status( 201 ).json( {
        success: true,
        message: 'Note was successfully created',
        data: {
            note: note
        }
    });
 } );

export const updateNote = asyncWrapper( async ( req, res ) =>
{
     const { note } = req.params;

    const { title, body } = req.body;
    
    const updatedNote = await noteService.updateNote( {
        id: note,
        title: title,
        body: body
    } );

    return res.status( 200 ).json( {
        success: true,
        message: 'Note updated successfully',
        data: {
            note: updatedNote
        }
    })
 } );

export const deleteNote = asyncWrapper( async ( req, res ) =>
{
    await noteService.deleteNote( req.params.note );
    
    return res.status( 204 ).json( {
        success: true,
        message: 'Note deleted successfully'
    } );
 });
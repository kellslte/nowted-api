import asyncWrapper from "../helpers/async-wrapper.helper.js";
import * as trashService from '../services/trash.service.js';

export const getTrashedNotes = asyncWrapper( async ( req, res ) =>
{
    const trash = await trashService.getTrashedNotes( req.user.sub );

    return res.status( 200 ).json( {
        success: true,
        message: 'Trashed notes retrieved successfully',
        data: {
            trash: trash
        }
    } );
 } );

export const addNoteToTrash = asyncWrapper( async ( req, res ) =>
{
    await trashService.trashNote( req.params.note );

    const trash = await trashService.getTrashedNotes(req.user.sub);

    return res.status(200).json({
      success: true,
      message: "Note added to trash",
      data: {
        trash: trash,
      },
    });
 } );

export const removeNoteFromTrash = asyncWrapper( async ( req, res ) =>
{
    await trashService.restoreNote( req.params.note );

    const trash = await trashService.getTrashedNotes(req.user.sub);

     return res.status(200).json({
       success: true,
       message: "Note restored",
       data: {
         trash: trash,
       },
     });
 } );
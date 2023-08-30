import asyncWrapper from "../helpers/async-wrapper.helper.js";
import * as archiveService from '../services/archive.service.js';

export const getArchivedItems = asyncWrapper( async ( req, res ) =>
{
    const items = await archiveService.getTrashedNotes( req.user.sub );

    return res.status( 200 ).json( {
        success: true,
        message: 'Archived items retrieved successfully',
        data: {
            archive: items,
        }
    } );
 } );

export const addItemToArchive = asyncWrapper( async ( req, res ) =>
{ 
    await archiveService.trashNote( req.params.note );

    const items = await archiveService.getTrashedNotes( req.user.sub );    
    
     return res.status(200).json({
       success: true,
       message: "Note archived successfully",
       data: {
         archive: items,
       },
     });
} );

export const removeItemFromArchive = asyncWrapper( async ( req, res ) =>
{
    await archiveService.restoreNote( req.params.note );

    const items = await archiveService.getTrashedNotes(req.user.sub);

     return res.status(200).json({
       success: true,
       message: "Note removed from item successfully",
       data: {
         archive: items,
       },
     });
 } );
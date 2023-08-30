import asyncWrapper from "../helpers/async-wrapper.helper.js";
import { ApplicationError } from "../helpers/error.helper.js";
import * as folderService from "../services/folder.service.js";

export const getFolders = asyncWrapper( async ( req, res ) =>
{
    const folders = await folderService.getUserFolders({ id: req.user.sub });

    return res.status( 200 ).json( {
        success: true,
        message: "User folders successfully retrieved",
        data: {
            folders: folders
        }
    } );
});

export const getFolder = asyncWrapper( async ( req, res ) =>
{
    const folder = await folderService.getFolder( req.params.folder );

    if ( !folder ) throw new ApplicationError( 'This folder does not exist', 404 );

    return res.status( 200 ).json( {
        success: true,
        message: 'Folder retrieved successfully',
        data: {
            folder: folder
        }
    })
});

export const createFolder = asyncWrapper( async ( req, res ) =>
{
    const folder = await folderService.createFolder( {
        id: req.user.sub,
        folderName: req.body.folderName,   
    } );
    
    return res.status( 201 ).json( {
        success: true,
        message: 'Folder created successfully',
        data: {
            folder: folder
        }
    } );
 } );

export const updateFolder = asyncWrapper( async ( req, res ) =>
{ 
    const folder = await folderService.updateFolder( { id: req.user.sub, folderName: req.body.folderName } );

    return res.status( 200 ).json( {
        success: true,
        message: 'Folder updated successfully',
        data: {
            folder: folder
        }
    })
} );

export const deleteFolder = asyncWrapper( async ( req, res ) =>
{ 
    await folderService.deleteFolder( { id: req.params.folder } );
    
    return res.status( 204 ).json( {
        success: true,
        message: 'Folder deleted successfully',
    } );
} );
import asyncWrapper from "../helpers/async-wrapper.helper.js";
import * as favouriteService from '../services/favourite.service.js';

export const getFavouriteNotes = asyncWrapper( async ( req, res ) =>
{
    const favourites = await favouriteService.getAllFavourites( req.user.sub );
    
    return res.status( 200 ).json( {
        success: true,
        message: 'Favourite notes retrieved successfully',
        data: {
            favourites: favourites
        }
    } );
} );

export const addItemToFavourites = asyncWrapper( async ( req, res ) =>
{ 
    await favouriteService.addNoteToFavourites( req.params.note );

    const favourites = await favouriteService.getAllFavourites( req.user.sub );

    return res.status(200).json({
      success: true,
      message: "Note added successfully to favourites",
      data: {
        favourites: favourites,
      },
    });
} );

export const removeItemFromFavourites = asyncWrapper( async ( req, res ) =>
{
    await favouriteService.removeNoteFromFavourites( req.params.note );

    const favourites = await favouriteService.getAllFavourites(req.user.sub);

    return res.status(200).json({
      success: true,
      message: "Note added successfully to favourites",
      data: {
        favourites: favourites,
      },
    });
 } );

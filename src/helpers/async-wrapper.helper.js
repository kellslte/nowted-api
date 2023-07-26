const asyncWrapper = ( controller ) => async ( req, res, next ) =>
{
    try {
        await controller( req, res );
    } catch (e) {
        next(e);
    }
}

export default asyncWrapper;
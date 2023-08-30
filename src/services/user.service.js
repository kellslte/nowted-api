import { isEmail } from "../helpers/index.js"
import User from "../models/user.model.js"

export const getUser = async (identitifier) =>
{
    return ( isEmail( identitifier ) ) ? await User.findOne( { email: identitifier } ) : await User.findOne( { _id: identitifier });
} 

export const updateUser = async ( identitifier, payload ) =>
{
    return isEmail(identitifier)
      ? await User.findOneAndUpdate({ email: identitifier }, payload, { lean: true, new: true})
      : await User.findOneAndUpdate({_id: identitifier}, payload, { lean: true, new: true});
}
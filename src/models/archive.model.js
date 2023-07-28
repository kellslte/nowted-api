import { Schema, model } from "mongoose";
import User from "./user.model.js";

const ArchiveSchema = new Schema( {
    user: {
        type: User
    },

    items: {
        type: Array,
        default: [],
    }
}, { timestamps: true } );

const Archive = model( 'Archive', ArchiveSchema );

export default Archive;
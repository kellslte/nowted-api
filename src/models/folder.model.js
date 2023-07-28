import { Schema, model } from "mongoose";
import User from "./user.model.js";

const FolderSchema = new Schema( {
    user: {
        type: User,
        required: true
    },

    folders: {
        type: Object,
        default: {},
    }
}, { timestamps: true } );

const Folder = model( 'Folder', FolderSchema );
import { Schema, model, Types } from "mongoose";

const FolderSchema = new Schema( {
    user: {
        type: Types.ObjectId,
        ref: 'User'
    },

    name: {
        type: String,
        required: true
    },

    notes: [{
        type: Types.ObjectId,
        ref: 'Note',
    }]
}, { timestamps: true } );

const Folder = model( 'Folder', FolderSchema );

export default Folder;
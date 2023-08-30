import { Schema, model, Types } from 'mongoose';

const NoteSchema = new Schema( {
    title: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now()
    },

    body: {
        type: String,
        required: true
    },

    trashed: {
        type: Boolean,
        default: false
    },

    archived: {
        type: Boolean,
        default: false
    },

    favourited: {
        type: Boolean,
        default: false
    },

    folder: {
        type: Types.ObjectId,
        ref: 'Folder'
    }
}, { timestamps: true } );

const Note = model( 'Note', NoteSchema );

export default Note;
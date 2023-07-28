import { Schema, model } from 'mongoose';
import User from './user.model.js';

const NoteSchema = new Schema( {
    title: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
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

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true } );

const Note = model( 'Note', NoteSchema );

export default Note;
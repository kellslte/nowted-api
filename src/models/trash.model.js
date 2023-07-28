import { Schema, model } from 'mongoose';
import User from './user.model.js';

const TrashSchema = new Schema( {
    user: {
        type: User
    },

    items: {
        type: Array,
        default: [],
    }
}, { timestamps: true } );

const Trash = model('Trash', TrashSchema);
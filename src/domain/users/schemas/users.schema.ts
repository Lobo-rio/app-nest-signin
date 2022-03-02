import * as mongoose from 'mongoose';
import { hash } from 'bcrypt';

export const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    }
});

UsersSchema.pre('save', async function(next) {
    try {
        if (!this.isModified('password')) return next();

        this['password'] = await hash(this['password'], 10);
    } catch(error) {
        return next(error);
    }
})

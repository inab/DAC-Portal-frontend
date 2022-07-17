import mongoose from 'mongoose';
import { assertionsSchema } from './assertions';

const userPermissionsSchema = new mongoose.Schema({
    sub: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    assertions: [assertionsSchema],
}, { collection: 'userPermissions' });

const db = mongoose.connection.useDb('permissions_api');

const UserPermissions = db.model('userPermissions', userPermissionsSchema);

export { UserPermissions }
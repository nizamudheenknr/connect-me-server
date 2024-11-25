import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: { 
        type: String,
         enum: ['admin', 'user'], 
         default: 'admin' }
    
});

 const Admin= mongoose.model('Admin', AdminSchema);
 export default Admin
import mongoose from 'mongoose'

const Follow = new mongoose.Schema({
    follower: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    followed: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model('Follow', Follow);
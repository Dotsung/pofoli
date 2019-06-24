import mongoose from 'mongoose'

const Heart = new mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    postid: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
});

export default mongoose.model('Heart', Heart);
import mongoose from 'mongoose'

const ImgTest = new mongoose.Schema({
  url: String,
  id: String
});

export default mongoose.model('ImgTest', ImgTest) 
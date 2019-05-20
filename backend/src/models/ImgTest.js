import mongoose from 'mongoose'

const ImgTest = new mongoose.Schema({
  key: String,
  url: String
});

ImgTest.statics.saveImg = function({ key, url }) {

  const img = new this({
    key,
    url
  });
  return img.save();
};

export default mongoose.model('ImgTest', ImgTest) 
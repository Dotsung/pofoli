import ImgTest from 'models/ImgTest'

import cloudinary from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
  

export const save = async (ctx) => {
    cloudinary.uploader.upload( ctx.request.files.image.path, async (result) => {
        var test = new ImgTest({
            url: result.url,
            id: result.public_id
        });

        try {
            await test.save()
            ctx.body = test;
          } catch (err) {
            ctx.throw(500, err)
        }
    });
}
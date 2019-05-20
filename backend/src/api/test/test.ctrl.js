import ImgTest from 'models/ImgTest';
import uploadFile from 's3/uploadFile';

export const save = async (ctx) => {
    console.log(ctx.request.files.image)
    const file = ctx.request.files.image

    const { key, url } = await uploadFile({
        fileName: file.name,
        filePath: file.path,
        fileType: file.type
    });

    let img = null;

    try {
        img = await ImgTest.saveImg({key, url});
    } catch (err) {
        ctx.throw(500, err);
    }

    ctx.body = img;
}
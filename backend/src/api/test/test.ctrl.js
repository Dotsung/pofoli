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

    ctx.body = { key, url };
}
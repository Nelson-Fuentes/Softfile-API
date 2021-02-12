import * as FileController from '../controllers/files.controller';
import express from 'express';

export const view_image = async(request, response) => {
    const filename = request.params.filename;
    let path_image = __dirname.replace("build", 'src');
    path_image = path_image.replace("src/views", '') + FileController.PATH_UPLOADED_FILES + FileController.PATH_UPLOADED_IMAGES + filename;
    response.sendFile(path_image);
}
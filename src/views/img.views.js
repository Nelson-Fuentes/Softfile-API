import * as FileController from '../controllers/files.controller';
import express from 'express';

export const view_image = async(request, response) => {
    const filename = request.params.filename;
    const path_image = __dirname.replace("src/views", '') + FileController.PATH_UPLOADED_FILES + FileController.PATH_UPLOADED_IMAGES + filename;
    response.sendFile(path_image);
}
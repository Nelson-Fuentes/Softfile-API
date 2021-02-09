import { request } from 'express';
import * as AuthenticationController from '../controllers/auth.controller';
import * as ProfileController from '../controllers/profile.controller';
import * as FileController from '../controllers/files.controller';

export const get_profile = async(request, response) => {
    const token = request.headers.authorization.split('token ')[1];
    const user = await AuthenticationController.get_user(token);
    if (user) {
        const profile = await ProfileController.get_profile(user._id);
        response.json(await ProfileController.show_profile(profile));
    } else {
        response.json(404).json('no se encontro usuario')
    }
}

export const update_profile = async(request, response) => {
    const token = request.headers.authorization.split('token ')[1];
    const user = await AuthenticationController.get_user(token);
    if (user) {
        const data = request.body;
        const hostname = request.protocol + '://' + request.headers.host;
        const url_image = await FileController.write_base64_to_image(data.image, user._id + '_image.jpg', hostname);
        const url_wallpaper = await FileController.write_base64_to_image(data.wallpaper, user._id + '_wallpaper.jpg', hostname);
        const profile = await ProfileController.update_profile(user._id,
            data.firstname, data.lastname, url_image, url_wallpaper,
            data.description, data.degree_id);
        response.json(await ProfileController.show_profile(profile));
    } else {
        response.json(404).json('no se encontro usuario')
    }
}
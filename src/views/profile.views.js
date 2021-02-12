import { request } from 'express';
import * as AuthenticationController from '../controllers/auth.controller';
import * as ProfileController from '../controllers/profile.controller';
import * as FileController from '../controllers/files.controller';
import base64string from '../models/base64.models';

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
        const base64_image = new base64string(data.image);
        const base64_wallpaper = new base64string(data.wallpaper);
        let url_image = data.image;
        let url_wallpaper = data.wallpaper
        if (base64_image.is_valid) {
            url_image = await FileController.write_base64_to_image(base64_image, user._id + '_image', hostname);
        }
        if (base64_wallpaper.is_valid) {
            url_wallpaper = await FileController.write_base64_to_image(base64_wallpaper, user._id + '_wallpaper', hostname);
        }
        const profile = await ProfileController.update_profile(user._id,
            data.firstname, data.lastname, url_image, url_wallpaper,
            data.description, data.degree_id, data.location);
        response.json(await ProfileController.show_profile(profile));
    } else {
        response.json(404).json('no se encontro usuario')
    }
}
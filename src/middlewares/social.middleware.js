import { request, response } from 'express';
import SocialUser from '../models/social.user.models';
import * as AuthController from '../controllers/auth.controller';


export const verify_link_duplicated = async(request, response, next) => {
    try {
        const { link } = request.body;
        const social = await SocialUser.findOne({ link });
        if (!social) next();
        else response.status(400).json('Enlace a red social ya se encuentra en uso.');
    } catch (err) {
        response.status(500).json('Error en el servidor');
    }
}

export const verify_socialnet_belongs_user_auth = async(request, response, next) => {
    try {
        const token = request.headers.authorization.split('token ')[1];
        const user = await AuthController.get_user(token);
        const id = request.params.id;
        const social = await SocialUser.findOne({ _id: id, user: user._id });
        if (social) next();
        else response.status(401).json('Red social no pertenece a usuario');
    } catch (err) {
        response.status(500).json('Error en el servidor');
    }
}
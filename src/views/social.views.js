import { request, response } from 'express';
import * as SocialController from '../controllers/social.controller';
import * as AuthController from '../controllers/auth.controller';

export const get_all_socialnets = async(request, response) => {
    try {
        const socialnets = await SocialController.get_all_socialnets();
        response.json(socialnets);
    } catch (err) {
        console.log(err);
        response.status(500).json('Error en el servidor');
    }
}

export const create_socialnet_user_auth = async(request, response) => {
    try {
        const token = request.headers.authorization.split('token ')[1];
        const user = await AuthController.get_user(token);
        const { link, socialnet_id } = request.body;
        const socialnet = await SocialController.create_socialnet_user(user._id, socialnet_id, link);
        response.json(await SocialController.show_socialnet_user(socialnet));
    } catch (err) {
        console.log(err);
        response.status(500).json('Error en el servidor');
    }
}

export const update_social_user_auth = async(request, response) => {
    try {
        const token = request.headers.authorization.split('token ')[1];
        const id = request.params.id;
        const user = await AuthController.get_user(token);
        const data = request.body;
        const socialnet = await SocialController.update_socialnet_user(id, user._id, data.socialnet_id, data.link);
        response.json(await SocialController.show_socialnet_user(socialnet));
    } catch (err) {
        console.log(err);
        response.status(500).json('Error en el servidor');
    }
}

export const get_socialnet_user_auth = async(request, response) => {
    try {
        const token = request.headers.authorization.split('token ')[1];
        const user = await AuthController.get_user(token);
        const socialnets = await SocialController.get_socialnet_user(user._id);
        response.json(await SocialController.show_socialnets_user(socialnets));
    } catch (err) {
        console.log(err);
        response.status(500).json('Error en el servidor');
    }
}

export const delete_socialnet_user = async(request, response) => {
    try {
        const id = request.params.id;
        const socialnet = await SocialController.delete_socialnet_user(id);
        response.json(socialnet);
    } catch (err) {
        console.error(err);
        response.status(500).json('Error en el servidor');
    }
}
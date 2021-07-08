import { request, response } from 'express';
import * as StudyCenterController from '../controllers/study.center.controller';
import * as AuthController from '../controllers/auth.controller';

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


export const create_study_center_user_auth = async(request, response) => {
    try {
        const token = request.headers.authorization.split('token ')[1];
        const user = await AuthController.get_user(token);
        const { name } = request.body;
        const study_center = await StudyCenterController.create_study_center_user(user._id, name);
        response.json(await StudyCenterController.show_study_center(study_center));
    } catch (err) {
        console.log(err);
        response.status(500).json('Error en el servidor');
    }
}


export const update_study_center_auth = async(request, response) => {
    try {
        const id = request.params.id;
        const data = request.body;
        const study_center = await StudyCenterController.update_study_center(id, data.name);
        response.json(await StudyCenterController.show_study_center(study_center));
    } catch (err) {
        console.log(err);
        response.status(500).json('Error en el servidor');
    }
}

export const get_study_center_user_auth = async(request, response) => {
    try {
        const token = request.headers.authorization.split('token ')[1];
        const user = await AuthController.get_user(token);
        const study_centers = await StudyCenterController.get_study_center_user(user._id);
        response.json(await StudyCenterController.show_studies_centers(study_centers));
    } catch (err) {
        console.log(err);
        response.status(500).json('Error en el servidor');
    }
}

export const delete_study_center_user = async(request, response) => {
    try {
        const id = request.params.id;
        const study_center = await StudyCenterController.delete_study_center_user(id);
        response.json(study_center);
    } catch (err) {
        console.error(err);
        response.status(500).json('Error en el servidor');
    }
}

/*

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
*/
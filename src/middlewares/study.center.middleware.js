import { request, response } from 'express';
import StudyCenter from '../models/study.center.model';
import * as AuthController from '../controllers/auth.controller';



export const verify_study_center_belongs_user_auth = async(request, response, next) => {
    try {
        const token = request.headers.authorization.split('token ')[1];
        const user = await AuthController.get_user(token);
        const id = request.params.id;
        const study_center = await StudyCenter.findOne({ _id: id, user: user._id });
        if (study_center) next();
        else response.status(401).json('Red social no pertenece a usuario');
    } catch (err) {
        response.status(500).json('Error en el servidor');
    }
}
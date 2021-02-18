import PhoneNumber from '../models/phone.number.models';
import * as AuthController from '../controllers/auth.controller';
import { request, response } from 'express';

export const verify_phone_duplicated = async(request, response, next) => {
    try {
        const token = request.headers.authorization.split('token ')[1];
        const user = await AuthController.get_user(token);
        const { number, code_id } = request.body;
        const phone = await PhoneNumber.findOne({ number, code: code_id, user: user._id });
        if (!phone) {
            next();
        } else {
            response.status(400).json('Este numero telefonico ya esta en uso');
            return;
        }
    } catch (err) {
        response.status(500).json('Error en el servidor');
        console.error(err);
    }
}

export const verify_phone_belongs_user_auth = async(request, response, next) => {
    try {
        const token = request.headers.authorization.split('token ')[1];
        const user = await AuthController.get_user(token);
        const id = request.params.id;
        const phone = await PhoneNumber.findOne({ _id: id, user: user._id });
        if (phone) {
            next();
        } else {
            response.status(401).json('Telefono no pertence a usuario')
        }
    } catch (err) {
        response.status(500).json('Error en el servidor');
        console.error(err);
    }
}
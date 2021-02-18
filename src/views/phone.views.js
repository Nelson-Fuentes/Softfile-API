import { request, response } from 'express';
import * as PhoneController from '../controllers/phone.controller';
import * as AuthController from '../controllers/auth.controller';

export const get_all_phone_codes = async(request, response) => {
    try {
        const codes = await PhoneController.get_all_phone_codes();
        response.json(codes);
    } catch (err) {
        response.status(500).json('Error en el servidor');
        console.error(err);
    }
}

export const create_phone_user_auth = async(request, response) => {
    try {
        const token = request.headers.authorization.split('token ')[1];
        const user = await AuthController.get_user(token);
        const { number, code_id } = request.body;
        const phone = await PhoneController.create_email(number, code_id, user._id);
        response.json(await PhoneController.show_phone(phone));
    } catch (err) {
        response.status(500).json('Error en el servidor');
        console.error(err);
    }
}

export const get_all_phones_user_auth = async(request, response) => {
    try {
        const token = request.headers.authorization.split('token ')[1];
        const user = await AuthController.get_user(token);
        const phones = await PhoneController.get_all_phones_user(user._id);
        response.json(await PhoneController.show_phones(phones))
    } catch (err) {
        response.status(500).json('Error en el servidor');
        console.error(err);
    }
}

export const update_phone_user_auth = async(request, response) => {
    try {
        const token = request.headers.authorization.split('token ')[1];
        const user = await AuthController.get_user(token);
        const phone_id = request.params.id;
        const data = request.body;
        const phone = await PhoneController.update_phone(phone_id, data.number, data.code_id, user._id, );
        response.json(await PhoneController.show_phone(phone));
    } catch (err) {
        response.status(500).json('Error en el servidor');
        console.error(err);
    }
}

export const delete_phone_user_auth = async(request, response) => {
    try {
        const phone_id = request.params.id;
        const phone = await PhoneController.delete_phone(phone_id);
        response.json(await PhoneController.show_phone(phone));
    } catch (err) {
        response.status(500).json('Error en el servidor');
        console.error(err);
    }
}
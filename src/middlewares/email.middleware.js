import { request, response } from 'express';
import Email from './../models/email.models';
import * as AuthController from '../controllers/auth.controller'

export const check_email_duplicated = async(request, response, next) => {
    try {
        const email = await Email.findOne({ adress: request.body.email, validated: true });
        if (email) {
            return response.status(400).json({ message: "Dirección de correo electronico ya esta en uso." });
        }
        next();
    } catch (error) {
        response.status(500).json({ message: "Servidor Error" })
    }
}

export const verify_email_registred = async(request, response, next) => {
    try {
        const email = await Email.findOne({ adress: request.body.email, validated: true });
        if (!email) {
            return response.status(400).json({ message: "No se ha registrado esta direccion de correo electronico" });
        }
        next();
    } catch (error) {
        response.status(500).json({ message: "Servidor Error" })
    }
}

export const verify_email_belong_user_auth = async(request, response, next) => {
    try {
        const token = request.headers.authorization.split('token ')[1];
        const email_id = request.params.id;
        const user = await AuthController.get_user(token);
        const email = await Email.findById(email_id);
        const belongs = email.user == user._id + '';
        if (belongs) {
            next()
        } else {
            response.status(401).json('Email no pertenece al usuario autenticado')
        };
    } catch (err) {
        response.status(500).json({ message: "Servidor Error" })
    }
}

export const verify_email_one_email_will_persist = async(request, response, next) => {
    try {
        const token = request.headers.authorization.split('token ')[1];
        const user = await AuthController.get_user(token);
        const emails = await Email.find({ user: user._id });
        if (emails.length > 1) next();
        else response.status(401).status('Cada usuario debe tener al menos un email.');
    } catch (err) {
        response.status(500).json({ message: "Servidor Error" })
    }
}
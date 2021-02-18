import { config } from 'dotenv';
import { request, response } from 'express';
import JWT from 'jsonwebtoken';
import User from '../models/user.models';

config();

export const verify_a_token_was_sended = async(request, response, next) => {
    if (request.headers.authorization) {
        next()
    } else {
        response.json(401).json('No se envio un token de sesion');
    }
    return;
}

export const verify_token_expires = async(request, response, next) => {
    if (request.headers && request.headers.authorization) {
        const token = request.headers.authorization.split('token ')[1];
        JWT.verify(token, process.env.SECRET_KEY_AUTHENTICATION, function(err, decoded) {
            if (err) {
                console.log(err)
                response.status(401).json({ message: 'Sesión invalida o expirada' })
            } else {
                next();
            }
        })
    } else {
        response.status(401).json('No fue enviado ningun token de sesion')
    }
    return;
}

export const verify_user_from_token = async(request, response, next) => {
    const token = request.headers.authorization.split('token ')[1];
    const user_id = await JWT.verify(token, process.env.SECRET_KEY_AUTHENTICATION)._id;
    const active_status = await User.statusActive();
    const user = await User.findOne({ _id: user_id, status: active_status });
    if (!user) {
        response.status(401).json({ message: 'La sesion no corresponde a ningun usuario activo.' });
    } else {
        next();
    }
    return;
}
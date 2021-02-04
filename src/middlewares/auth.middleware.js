import { config } from 'dotenv';
import JWT from 'jsonwebtoken';
import User from '../models/user.models';

config();

export const verify_token_expires = async(request, response, next) => {
    const token = request.headers.authorization.split('token ')[1];
    JWT.verify(token, process.env.SECRET_KEY_AUTHENTICATION, function(err, decoded) {
        if (err) {
            console.log(err)
            response.status(401).json({ message: 'Sesión invalida o expirada' })
        } else {
            next();
        }
    })
}

export const verify_user_from_token = async(request, response, next) => {
    const token = request.headers.authorization.split('token ')[1];
    const user_id = await JWT.verify(token, process.env.SECRET_KEY_AUTHENTICATION)._id;
    const active_status = await User.statusActive();
    const user = await User.findOne({ _id: user_id, status: active_status });
    if (!user) {
        response.status(401).json({ message: 'La sesion no corresponde a ningun usuario activo.' });
    } else {
        response.status(200).json({ username: user.username, firstname: user.firstname, lastname: user.lastname });
    }
}
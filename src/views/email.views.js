import * as EmailController from '../controllers/email.controller';
import JWT, { decode } from 'jsonwebtoken'
import { config } from 'dotenv';
import { request, response } from 'express';
import * as AuthController from '../controllers/auth.controller';
config();

export const validate_email = async(request, response) => {
    const token = request.params.token;
    await JWT.verify(token, process.env.SECRET_KEY_EMAIL_CONFIRM, async function(err, decoded) {
        if (err) {
            response.status(400).json({
                message: 'Ha pasado el tiempo limite y su solicitud a expirado'
            });
        } else {
            let email_id = decoded.email_id;
            try {
                await EmailController.validate_email(email_id);
                response.status(200).json({
                    message: 'Correo electronico validado.'
                });
            } catch (error) {
                response.status(500).json({
                    message: 'Error en el servidor'
                });
                console.error(error);
            }
        }
    });

}

export const get_user_emails = async(request, response) => {
    try {
        const token = request.headers.authorization.split('token ')[1];
        const user = await AuthController.get_user(token);
        const emails = await EmailController.get_user_emails(user._id);
        response.json(emails);
    } catch (err) {
        response.status(500).json('Error en el servidor');
    }

}

export const create_email = async(request, response) => {
    try {
        const token = request.headers.authorization.split('token ')[1];
        const { adress, redirectTo } = request.body;
        const user = await AuthController.get_user(token);
        const email = await EmailController.create_email(adress, user, redirectTo);
        response.json(email);
    } catch (err) {
        response.status(500).json('Error en el servidor');
        console.log(err);
    }
}

export const update_email_adress = async(request, response) => {
    try {
        const email_id = request.params.id;
        const { adress, redirectTo } = request.body;
        const email = await EmailController.update_email_adress(email_id, adress, redirectTo)
        response.json(email);
    } catch (err) {
        response.status(500).json('Error en el servidor');
        console.error(err);
    }
}

export const delete_email = async(request, response) => {
    try {
        const email_id = request.params.id;
        const email = await EmailController.delete_email(email_id);
        if (email) response.json(email);
        else response.status(401).json('No se pudo eliminar el correo')
    } catch (err) {
        response.status(500).json('Error en el servidor');
    }
}
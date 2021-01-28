import * as EmailController from '../controllers/email.controller';
import JWT, { decode } from 'jsonwebtoken'
import { config } from 'dotenv';
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
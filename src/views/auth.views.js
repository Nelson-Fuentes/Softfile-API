import Email from '../models/email.models'
import User from '../models/user.models';
import JWT from 'jsonwebtoken';
import { config } from 'dotenv';
import * as EmailModule from '../app.email';
import * as AuthController from '../controllers/auth.controller';

config();

export const reset_password_request = async(request, response) => {
    try {
        const { email, redirectTo } = request.body;
        const email_saved = await Email.findOne({ adress: email });
        const user = await User.findById(email_saved.user);
        const token = JWT.sign({ user_id: user._id }, process.env.SECRET_KEY_RESET_PASSWORD, { expiresIn: '1h' });
        await EmailModule.send_email(email, "Cambio de contraseña", 'templates/email/reset_password.html', {
            username: user.username,
            redirectTo: redirectTo + token,
        });
        response.json({ message: "Correo de confirmación enviado" });
    } catch (error) {
        console.log(error);
    }
}

export const reset_password_action = async(request, response) => {
    const token = request.params.token;
    await JWT.verify(token, process.env.SECRET_KEY_RESET_PASSWORD, async function(err, decoded) {
        if (err) {
            response.status(400).json({
                message: 'Ha pasado el tiempo limite y su solicitud a expirado'
            });
        } else {
            let user_id = decoded.user_id;
            try {
                const { password } = request.body;
                await AuthController.change_password(user_id, password);
                response.status(200).json({
                    message: 'Contraseña cambiada.'
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
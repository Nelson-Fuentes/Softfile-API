import Email from '../models/email.models'
import JWT from 'jsonwebtoken';
import { config } from 'dotenv';
config();

export const reset_password_request = async(request, response) => {
    try {
        const { email } = request.body;
        const email_saved = await Email.findOne({ adress: email });
        const token = JWT.sign({ user_id: email_saved.user }, process.env.SECRET_KEY_RESET_PASSWORD)
        response.json(token);
    } catch {
        console.log(erro);
    }
}
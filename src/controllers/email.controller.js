import Email from '../models/email.models';
import * as EmailModule from '../app.email';
import JWT from 'jsonwebtoken'
import { config } from 'dotenv';
config();

export const create_email = async(adress, user, redirectTo) => {

    const email_unsaved = new Email({ adress, user });
    const email_saved = await email_unsaved.save();
    const token = JWT.sign({ email_id: email_saved._id, redirectTo }, process.env.SECRET_KEY_EMAIL_CONFIRM, { expiresIn: '24h' });
    await EmailModule.send_email(adress, "Confirmar correo electronico", 'templates/email/confirm_email.html', {
        username: user.username,
        fullname: user.firstname + ' ' + user.lastname,
        token: token
    });

    return email_saved;
}


export const validate_email = async(email_id) => {
    const email = await Email.findById(email_id);
    if (email) {
        email.validated = true;
        await email.save();
    }
}
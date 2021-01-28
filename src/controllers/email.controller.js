import Email from '../models/email.models';
import * as EmailModule from '../app.email';
import JWT from 'jsonwebtoken'
import { config } from 'dotenv';
import User from '../models/user.models';

config();

export const create_email = async(adress, user, redirectTo) => {
    let email_unsaved = await Email.findOne({ adress: adress });
    if (email_unsaved && !email_unsaved.validated) {
        email_unsaved.user = user;
    } else {
        email_unsaved = new Email({ adress, user })
    }
    const email_saved = await email_unsaved.save();
    const token = JWT.sign({ email_id: email_saved._id }, process.env.SECRET_KEY_EMAIL_CONFIRM, { expiresIn: '24h' });
    await EmailModule.send_email(adress, "Confirmar correo electronico", 'templates/email/confirm_email.html', {
        username: user.username,
        fullname: user.firstname + ' ' + user.lastname,
        redirectTo: redirectTo + '/' + token,
    });

    return email_saved;
}


export const validate_email = async(email_id) => {
    const email = await Email.findById(email_id);
    if (email) {
        email.validated = true;
        await email.save();
        const user = await User.findById(email.user);
        user.status = await User.statusActive();
        await user.save()
    }
}

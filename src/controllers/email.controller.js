import Email from '../models/email.models';
import * as EmailModule from '../app.email';
import JWT from 'jsonwebtoken'
import { config } from 'dotenv';
import * as UserController from '../controllers/user.controller';
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
    await send_validation_email(email_saved, redirectTo);
    return email_saved;
}

export const get_user_emails = async(user_id) => {
    const emails = await Email.find({ user: user_id });
    return emails;
}

export const update_email_adress = async(email_id, email_adress, redirectTo) => {
    const email = await Email.findById(email_id);
    email.adress = email_adress;
    email.validated = false;
    const email_updated = await email.save();
    await send_validation_email(email_updated, redirectTo)
    return email_updated;
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


export const send_validation_email = async(email, redirectTo) => {
    const user = await UserController.get_user(email.user);
    const token = JWT.sign({ email_id: email._id }, process.env.SECRET_KEY_EMAIL_CONFIRM, { expiresIn: '24h' });
    await EmailModule.send_email(email.adress, "Confirmar correo electronico", 'templates/email/confirm_email.html', {
        username: user.username,
        fullname: user.firstname + ' ' + user.lastname,
        redirectTo: redirectTo + '/' + token,
    });
}

export const delete_email = async(email_id) => {
    const email = await Email.findById(email_id);
    const emails = await get_user_emails(email.user);
    if (emails.length > 1) {
        const email_deleted = await Email.findByIdAndDelete(email_id)
        return email_deleted;
    } else {
        return undefined;
    }
}
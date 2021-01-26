import Email from '../models/email.models';
import * as EmailModule from '../app.email';


export const create_email = async(adress, user, redirectTo) => {

    const email_unsaved = new Email({ adress, user });
    const email_saved = await email_unsaved.save();

    await EmailModule.send_email(adress, "Confirmar correo electronico", 'templates/email/confirm_email.html', {
        username: user.username,
        fullname: user.firstname + ' ' + user.lastname,
        email_id: email_saved._id,
        redirectTo: redirectTo
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
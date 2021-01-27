import * as EmailController from '../controllers/email.controller';
import JWT, { decode } from 'jsonwebtoken'
import { config } from 'dotenv';
config();

export const validate_email = async(request, response) => {
    const token = request.params.token;
    await JWT.verify(token, process.env.SECRET_KEY_EMAIL_CONFIRM, async function(err, decoded) {
        if (err) {
            response.redirect(process.env.CONFIRMATION_EMAIL_ERROR);
        } else {
            let email_id = decoded.email_id;
            let redirectTo = decoded.redirectTo;
            try {
                await EmailController.validate_email(email_id);
            } catch (error) {
                console.log(error)
            } finally {
                response.redirect(redirectTo);
            }
        }
    });

}
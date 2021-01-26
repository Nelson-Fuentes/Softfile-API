import EmailController from '../controllers/email.controller';

export const validate_email = async(request, response) => {
    const { email_id, redirectTo } = request.body;
    try {
        await EmailController.validate_email(email_id);
    } catch (error) {
        console.log(error)
    } finally {
        response.redirect(redirectTo);
    }
}
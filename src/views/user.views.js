import * as EmailController from '../controllers/email.controller';
import * as UserController from '../controllers/user.controller';

export const create_user = async(request, response) => {
    try {
        const { username, firstname, lastname, password, email, redirectTo } = request.body;
        const user = await UserController.create_user(username, firstname, lastname, password);
        const email_saved = await EmailController.create_email(email, user, redirectTo);

        return response.status(200).json({
            _id: user._id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            status: user.status,
            email: [{ adress: email_saved.adress, validated: email_saved.validated }]
        });

    } catch (error) {
        console.error(error);
        response.status(500).json({
            message: error
        });
    }
}
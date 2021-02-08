import * as AuthenticationController from '../controllers/auth.controller';
import * as ProfileController from '../controllers/profile.controller';

export const get_profile = async(request, response) => {
    const token = request.headers.authorization.split('token ')[1];
    const user = await AuthenticationController.get_user(token);
    if (user) {
        const profile = await ProfileController.get_profile(user._id);
        response.json(await ProfileController.show_profile(profile));
    } else {
        response.json(404).json('no se encontro usuario')
    }
}
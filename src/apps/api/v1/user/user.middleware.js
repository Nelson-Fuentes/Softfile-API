import User from '../../../../models/user.models';

export const check_username_duplicated = async(request, response, next) => {
    try {
        const user = await User.findOne({ username: request.body.username });
        if (user) {
            return response.status(400).json({ message: "Nombre de usuario ya registrado." });
        }
        next();
    } catch (error) {
        response.status(500).json({ message: "Servidor Error" })
    }
}
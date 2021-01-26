import Email from './../models/email.models';

export const check_email_duplicated = async(request, response, next) => {
    try {
        const email = await Email.findOne({ adress: request.body.email });
        if (email) {
            return response.status(400).json({ message: "Dirección de correo electronico ya esta en uso." });
        }
        next();
    } catch (error) {
        response.status(500).json({ message: "Servidor Error" })
    }
}
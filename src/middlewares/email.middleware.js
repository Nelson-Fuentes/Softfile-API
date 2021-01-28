import Email from './../models/email.models';

export const check_email_duplicated = async(request, response, next) => {
    try {
        const email = await Email.findOne({ adress: request.body.email, validated: true });
        if (email) {
            return response.status(400).json({ message: "Dirección de correo electronico ya esta en uso." });
        }
        next();
    } catch (error) {
        response.status(500).json({ message: "Servidor Error" })
    }
}

export const verify_email_registred = async(request, response, next) => {
    try {
        const email = await Email.findOne({ adress: request.body.email, validated: true });
        if (!email) {
            return response.status(400).json({ message: "No se ha registrado esta direccion de correo electronico" });
        }
        next();
    } catch (error) {
        response.status(500).json({ message: "Servidor Error" })
    }
}
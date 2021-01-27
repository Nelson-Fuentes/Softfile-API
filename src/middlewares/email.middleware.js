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

export const verify_email_registred = async(request, response, next) => {
    try {
        const email = await Email.findOne({ adress: request.body.email });
        if (!email) {
            return response.status(400).json({ message: "No se ha registrado esta direccion de correo electronico" });
        }
        next();
    } catch (error) {
        response.status(500).json({ message: "Servidor Error" })
    }
}

export const verify_email_validated = async(request, response, next) => {
    try {
        const email = await Email.findOne({ adress: request.body.email, validated: true });
        console.log(email)
        if (!email) {
            return response.status(400).json({ message: "Este correo ha sido registrado pero no ha sido validado, revise la bandeja de entrada de su correo para validarlo." });
        }
        next();
    } catch (error) {
        response.status(500).json({ message: "Servidor Error" })
    }
}
import { Request, Response } from 'express'
import User from '../../../../models/user.models';

/**
 * @param {Resquest} request
 * @param {Response} response 
 */
export const create_user = async(request, response) => {
    try {
        const { username, firstname, lastname, password } = request.body;
        const user = new User({
            username,
            firstname,
            lastname,
            password
        });
        user.password = await User.encryptPassword(user.password);
        const saved_user = await user.save();
        return response.status(200).json({
            _id: saved_user._id,
            username: saved_user.username,
            firstname: saved_user.firstname,
            lastname: saved_user.lastname
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({
            message: error
        });
    }
}
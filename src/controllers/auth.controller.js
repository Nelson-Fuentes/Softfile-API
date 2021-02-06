import User from '../models/user.models'
import JWT from 'jsonwebtoken';

export const change_password = async(user_id, password) => {
    const user = await User.findById(user_id);
    user.password = await User.encryptPassword(password);
    const saved_user = await user.save();
    return saved_user;
}

export const authentication = async(username, password) => {
    const user = await User.findOne({ username });
    const compare_password = await User.comparePassword(password, user.password);
    if (compare_password) {
        return user
    } else {
        return undefined;
    }
}

export const get_user = async(token) => {
    const user_id = await JWT.verify(token, process.env.SECRET_KEY_AUTHENTICATION)._id;
    if (!user_id) {
        return undefined;
    } else if (user_id) {
        const user = await User.findById(user_id);
        if (user) return user;
        else return undefined;
    }
}
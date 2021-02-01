import User from '../models/user.models'

export const change_password = async(user_id, password) => {
    const user = await User.findById(user_id);
    user.password = await User.encryptPassword(password);
    const saved_user = await user.save();
    return saved_user;
}
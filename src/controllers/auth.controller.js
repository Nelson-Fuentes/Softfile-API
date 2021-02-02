import User from '../models/user.models'

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
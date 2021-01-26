import User from '../models/user.models';

export const create_user = async(username, firstname, lastname, password) => {

    const status = await User.statusDefault();
    const user = new User({ username, firstname, lastname, password, status });
    user.password = await User.encryptPassword(user.password);
    const saved_user = await user.save();
    return saved_user;

}
import User from '../models/user.models';

export const create_user = async(username, firstname, lastname, password) => {

    const status = await User.statusDefault();
    const user = new User({ username, firstname, lastname, password, status });
    user.password = await User.encryptPassword(user.password);
    const saved_user = await user.save();
    return saved_user;
}

export const get_user = async(user_id) => {
    const user = await User.findById(user_id);
    return user;
}

export const update_user = async(user_id, firstname, lastname, status) => {
    const user = await get_user(user_id);
    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;
    if (status) user.status = status._id;
    const user_updated = await user.save();
    return user_updated;
}
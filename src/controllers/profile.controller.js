import Profile from '../models/profile.models';
import User from '../models/user.models';
import Degree from '../models/deggree.models';

export const get_profile = async(user_id) => {
    let profile = await Profile.findOne({ user: user_id });
    if (!profile) {
        profile = new Profile({ user: user_id });
        profile = await profile.save();
    }
    return profile
}

export const show_profile = async(profile) => {
    const user = await User.findById(profile.user);
    const degree = await Degree.findById(profile.degree);
    const data = {
        user: {
            _id: user._id,
            username: user.username,
            firstname: user.username,
            lastname: user.lastname
        },
        image: profile.image,
        wallpaper: profile.wallpaper,
        description: profile.description,
        degree: degree
    }
    return data;
}
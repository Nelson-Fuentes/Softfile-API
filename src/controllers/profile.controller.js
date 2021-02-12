import Profile from '../models/profile.models';
import User from '../models/user.models';
import Degree from '../models/deggree.models';
import City from '../models/city.models';
import * as UserController from '../controllers/user.controller';
import * as LocationController from '../controllers/location.controller';

export const get_profile = async(user_id) => {
    let profile = await Profile.findOne({ user: user_id });
    if (!profile) {
        profile = new Profile({ user: user_id });
        profile = await profile.save();
    }
    return profile
}

export const show_profile = async(profile) => {
    console.log(profile)
    const user = await User.findById(profile.user);
    const degree = await Degree.findById(profile.degree);
    const location = await City.findById(profile.location);
    const data = {
        user: {
            _id: user._id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname
        },
        image: profile.image,
        wallpaper: profile.wallpaper,
        description: profile.description,
        degree,
        location: await LocationController.show_city(location)
    }
    return data;
}

export const update_profile = async(user_id, firstname, lastname, image, wallpaper, description, degree_id, location) => {
    const profile = await get_profile(user_id);
    const user = await UserController.update_user(user_id, firstname, lastname);
    if (image) profile.image = image;
    if (wallpaper) profile.wallpaper = wallpaper;
    if (description) profile.description = description;
    if (degree_id) profile.degree = degree_id;
    if (location) profile.location = location;
    console.log(profile)
    const profile_updated = await profile.save();
    return profile_updated;
}
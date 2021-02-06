import Profile from '../models/profile.models';

export const get_profile = async(user_id) => {
    let profile = await Profile.findOne({ user: user_id });
    if (!profile) {
        profile = new Profile({ user: user_id });
        profile = await profile.save();
    }
    return profile
}
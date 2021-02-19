import SocialUser from '../models/social.user.models';
import SocialNet from '../models/social.net.models';

export const get_all_socialnets = async() => {
    const socialnets = await SocialNet.find();
    return socialnets
}

export const get_socialnet_user = async(user_id) => {
    const socialnets = await SocialUser.find({ user: user_id });
    return socialnets;
}

export const create_socialnet_user = async(user_id, socialnet_id, link) => {
    const socialnet = new SocialUser({ user: user_id, socialnet: socialnet_id, link: link });
    const socialnet_saved = await socialnet.save();
    return socialnet_saved;
}

export const update_socialnet_user = async(id, user_id, socialnet_id, link) => {
    const socialnet = await SocialUser.findById(id);
    if (user_id) socialnet.user = user_id;
    if (socialnet_id) socialnet.socialnet = socialnet_id;
    if (link) socialnet.link = link;
    const socialnet_saved = await socialnet.save();
    return socialnet_saved;
}

export const delete_socialnet_user = async(id) => {
    const socialnet = await SocialUser.findByIdAndDelete(id);
    return socialnet;
}

export const show_socialnet_user = async(socialnet) => {
    const social = await SocialNet.findOne(socialnet.socialnet)
    const data = {
        _id: socialnet._id,
        link: socialnet.link,
        user: socialnet.user,
        socialnet: social
    };
    return data;
}

export const show_socialnets_user = async(socialnets) => {
    const data = [];
    for await (const socialnet of socialnets) {
        data.push(await show_socialnet_user(socialnet));
    }
    return data;
}
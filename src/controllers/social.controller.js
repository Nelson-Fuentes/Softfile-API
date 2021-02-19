import SocialUser from '../models/social.user.models';

export const get_social_net_user = async(user_id) => {
    const socialnets = await SocialUser.find({ user: user_id });
    return socialnets;
}

export const create_social_for_user = async(user_id, socialnet_id, link) => {
    const socialnet = new SocialUser({ user: user_id, socialnet: socialnet_id, link: link });
    const socialnet_saved = await socialnet.save();
    return socialnet_saved;
}

export const update_social_for_user = async(id, user_id, socialnet_id, link) => {
    const socialnet = await SocialUser.findById(id);
    if (user_id) socialnet.user = user_id;
    if (socialnet_id) socialnet.socialnet = socianet_id;
    if (link) socialnet.link = link;
    const socialnet_saved = await socialnet.save();
    return socialnet_saved;
}

export const delete_social_for_user = async(id) => {
    const socialnet = await SocialUser.findByIdAndDelete(id);
    return socialnet;
}
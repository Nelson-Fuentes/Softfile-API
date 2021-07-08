import StudyCenter from '../models//study.center.model'


export const get_study_center_user = async(user_id) => {
    const studies_centers = await StudyCenter.find({ user: user_id });
    return studies_centers;
}

export const create_study_center_user = async(user_id, name) => {
    const study_center = new StudyCenter({ user: user_id, name: name });
    const study_center_saved = await study_center.save();
    return study_center_saved;
}

export const show_study_center = async(study_center) => {
    //const social = await SocialNet.findOne(socialnet.socialnet)
    return {
        _id: study_center._id,
        name: study_center.name,
    }
}

export const update_study_center = async(id, name) => {
    const study_center = await StudyCenter.findById(id);
    if (name) study_center.name = name;
    const study_center_saved = await study_center.save();
    return study_center_saved;
}

export const show_studies_centers = async(studies_centers) => {
    const data = [];
    for await (const study_center of studies_centers) {
        data.push(await show_study_center(study_center));
    }
    return data;
}

export const delete_study_center_user = async(id) => {
    const study_center = await StudyCenter.findByIdAndDelete(id);
    return study_center;
}
import Degree from '../models/deggree.models';

export const get_all_degrees = async() => {
    const degrees = await Degree.find({});
    return degrees;
}
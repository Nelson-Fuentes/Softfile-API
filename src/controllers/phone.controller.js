import PhoneCode from '../models/phone.codes.models';

export const get_all_phone_codes = async() => {
    const codes = await PhoneCode.find();
    return codes;
}
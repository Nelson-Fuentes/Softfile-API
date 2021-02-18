import PhoneCode from '../models/phone.codes.models';
import PhoneNumber from '../models/phone.number.models';

export const get_all_phone_codes = async() => {
    const codes = await PhoneCode.find();
    return codes;
}

export const create_email = async(number, code_id, user_id) => {
    const phone_number = new PhoneNumber({ number: number, code: code_id, user: user_id });
    const phone_number_saved = await phone_number.save();
    return phone_number_saved
}

export const get_all_phones_user = async(user_id) => {
    const phones = await PhoneNumber.find({ user: user_id })
    return phones;
}

export const show_phone = async(phone) => {
    const code = await PhoneCode.findById(phone.code);
    const data = {
        _id: phone._id,
        number: phone.number,
        code: {
            _id: code._id,
            code: code.code,
            iso2: code.iso2,
            iso3: code.iso3
        }
    }
    return data
}

export const update_phone = async(phone_id, number, code_id, user_id) => {
    const phone = await PhoneNumber.findById(phone_id);
    if (number) phone.number = number;
    if (code_id) phone.code = code_id;
    if (user_id) phone.user = user_id;
    const phone_saved = await phone.save();
    return phone_saved;
}

export const delete_phone = async(phone_id) => {
    const phone = await PhoneNumber.findByIdAndDelete(phone_id);
    return phone;
}

export const show_phones = async(phones) => {
    const phones_data = [];
    for await (const phone of phones) {
        phones_data.push(await show_phone(phone));
    }
    return phones_data
}
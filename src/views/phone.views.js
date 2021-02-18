import * as PhoneController from '../controllers/phone.controller';

export const get_all_phone_codes = async(request, response) => {
    const codes = await PhoneController.get_all_phone_codes();
    response.json(codes);
}
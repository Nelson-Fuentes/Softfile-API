import { request, response } from 'express';
import * as LocationController from '../controllers/location.controller';

export const get_all_country = async(request, response) => {
    const countries = await LocationController.get_all_countries();
    response.json(countries);
}

export const get_country = async(request, response) => {
    const id = request.params.id;
    const country = await LocationController.get_country(id);
    response.json(await LocationController.show_country(country));
}
import { request, response } from 'express';
import * as DegreeController from '../controllers/degree.controller';


export const get_all_degrees = async(request, response) => {
    try {
        const degrees = await DegreeController.get_all_degrees();
        response.json(degrees);
    } catch (err) {
        console.error(err);
        response.status(500).json('Error en el servidor')
    }
}
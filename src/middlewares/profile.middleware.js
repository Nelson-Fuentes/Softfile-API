import Degree from '../models/deggree.models'

export const verify_exists_degree_id = async(request, response) => {
    const degree_id = request.body.degree_id;
    if (!degree_id) next();
    else {
        const degree = await Degree.findById(degree_id);
        if (degree) next();
        else response.status(400).json('No existe la especialidad seleccionada')
    }
}
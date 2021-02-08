import UserStatus from './models/user.status.models';
import Degree from './models/deggree.models'

export const DEFAULT_STATUS = ['No Verificado', 'Activo', 'Inactivo', 'Eliminado'];
export const DEFAULT_DEGREES = [
    'Systems Analyst',
    'Requirements Engineer',
    'UI Designer',
    'Tester',
    'Programmer',
    'Software Developer',
    'Software Architect',
    'Documentary',
    'Data Base Designer',
    'Data Engineer',
    'Computing Scientist',
    'System Engineer',
    'Artificial Intelligence Expert',
    'Investigator',
    'Data Scientist',
    'UX Designer',
    'Interaction Designer',
    'Proyect Manager',
    'Maintenance Engineer'
];

export const create_default_user_status = async() => {
    DEFAULT_STATUS.forEach(async(status_label) => {
        let exists = await UserStatus.findOne({ name: status_label });
        if (!exists) {
            let status = new UserStatus({ name: status_label });
            const status_saved = await status.save();
            console.log("User status: " + status_saved.name + " was saved with ID: " + status_saved._id)
        }
    })
}

export const create_default_degrees = async() => {
    DEFAULT_DEGREES.sort();
    DEFAULT_DEGREES.forEach(async(degree_label) => {
        const degrees_existing = await Degree.findOne({ name: degree_label });
        if (!degrees_existing) {
            const degree_unsaved = new Degree({ name: degree_label });
            const degree_saved = await degree_unsaved.save();
            console.info('Default degree was saved: ' + degree_saved);
        }
    })
}
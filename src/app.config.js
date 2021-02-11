import UserStatus from './models/user.status.models';
import Degree from './models/deggree.models'
import fs from 'fs';
import Country from './models/country.models';
import City from './models/city.models';

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

export const create_default_locations = async() => {
    const rawData = await fs.readFileSync('locations.json');
    const countries = JSON.parse(rawData);
    countries.forEach(async(country) => {
        const country_name = country.name;
        let country_saved = await Country.findOne({ name: country_name });
        if (!country_saved) {
            country_saved = new Country({ name: country_name });
            country_saved = await country_saved.save();
            console.log('Country ' + country_saved + ' was saved');
            const country_states = country.states;
            country_states.forEach(async(state) => {
                const state_name = state.name;
                let city_saved = await City.findOne({ name: state_name, country: country_saved._id });
                if (!city_saved) {
                    city_saved = new City({ name: state_name, country: country_saved._id });
                    city_saved = await city_saved.save();
                    console.log(city_saved)
                    console.log('City ' + city_saved + ' from ' + country_saved.name + ' was saved')
                }
            });
        }
    })
}
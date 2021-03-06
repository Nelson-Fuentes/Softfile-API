import UserStatus from './models/user.status.models';
import Degree from './models/deggree.models'
import fs from 'fs';
import Country from './models/country.models';
import City from './models/city.models';
import PhoneCode from './models/phone.codes.models';
import Socialnet from './models/social.net.models'

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

export const config_app = async() => {
    await create_default_user_status();
    await create_default_degrees();
    await create_default_locations();
    await create_default_code_number();
    await create_default_socialnets();
    return;
}

export const create_default_socialnets = async() => {
    const rawData = await fs.readFileSync('social.json');
    const socialnets = JSON.parse(rawData);
    await socialnets.forEach(
        async(socialnet_raw) => {
            let socialnet_saved = await Socialnet.findOne({ name: socialnet_raw.name });
            if (!socialnet_saved) {
                socialnet_saved = new Socialnet({
                    name: socialnet_raw.name,
                    domain: socialnet_raw.domain,
                    fontawesome: socialnet_raw.fontawesome
                })
                socialnet_saved = await socialnet_saved.save();
                console.info('Red social: ' + socialnet_saved + 'was saved');
            }
        }
    );
    return;
}

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
                    console.log('City ' + city_saved + ' from ' + country_saved.name + ' was saved')
                }
            });
        }
    })
}

export const create_default_code_number = async() => {
    const rawData = await fs.readFileSync('phone_codes.json');
    const codes = JSON.parse(rawData);
    await codes.forEach(async(code) => {
        let phone_code_saved = await PhoneCode.findOne({ code: code.phone_code });
        if (!phone_code_saved && (code.phone_code && code.iso2 && code.iso3)) {
            phone_code_saved = new PhoneCode({
                code: code.phone_code,
                iso2: code.iso2,
                iso3: code.iso3
            });
            phone_code_saved = await phone_code_saved.save();
            console.log('The phone code: ' + phone_code_saved + ' was saved.')
        }
    });
}
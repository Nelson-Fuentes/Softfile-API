import Country from '../models/country.models';
import City from '../models/city.models';

export const get_all_countries = async() => {
    const countries = await Country.find({});
    return countries;
}

export const get_country = async(id) => {
    const country = await Country.findById(id);
    return country;
}

export const get_city = async(id) => {
    const city = await City.findById(city);
    return city;
}

export const show_city = async(city) => {
    const country = await get_country(city.country);
    return {
        _id: city._id,
        name: city.name,
        country: country
    }
}

export const show_country = async(country) => {
    const cities = await City.find({ country: country._id })
    const json_data = []
    cities.forEach(city => {
        json_data.push({
            _id: city._id,
            name: city.name
        });
    });
    return {
        _id: country._id,
        name: country.name,
        cities: json_data
    }
}
import * as fs from 'fs';

export const PATH_UPLOADED_FILES = 'public/uploaded_files/';
export const PATH_UPLOADED_IMAGES = 'img/';
export const URL_PATH_UPLOAD_FILES = '/assets/';

export const write_base64_to_file = async(file_data, path, filename, hosting) => {
    if (file_data && path && filename) {
        const final_filename = Date.now() + '-' + filename + '.' + file_data.extension;
        await fs.writeFile(PATH_UPLOADED_FILES + path + final_filename, file_data.data, 'base64', function(err) {
            if (err) console.log(err);
        });
        return hosting + URL_PATH_UPLOAD_FILES + path + final_filename;

    } else {
        return undefined;
    }
}

export const write_base64_to_image = async(file_data, filename, hosting) => {
    return await write_base64_to_file(file_data, PATH_UPLOADED_IMAGES, filename, hosting);
}
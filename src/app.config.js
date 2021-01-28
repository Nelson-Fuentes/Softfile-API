import UserStatus from './models/user.status.models';

export const DEFAULT_STATUS = ['No Verificado', 'Activo', 'Inactivo', 'Eliminado'];


export const creat_default_user_status = async() => {
    let count = await UserStatus.estimatedDocumentCount();
    DEFAULT_STATUS.forEach(async(status_label) => {
        let exists = await UserStatus.findOne({ name: status_label });
        if (exists) {
            console.info("User status " + status_label + " was found.")
        } else {
            let status = new UserStatus({ name: status_label });
            status.save();
            console.log("User status: " + status.name + " was saved with ID: " + status._id)
        }
    })
}
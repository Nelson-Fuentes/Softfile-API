import * as DatabaseConfig from './app.database';
import app from './app.module'
import './app.email';
import * as AppConfig from './app.config';

const database_connection = DatabaseConfig.connect_database();
const PORT = process.env.SERVER_PORT;

database_connection.then(async(db) => {
    console.log('Database ' + process.env.DATABASE_NAME + ' connected.');
    await AppConfig.create_default_user_status();
    await AppConfig.create_default_degrees();
    await AppConfig.create_default_locations();
    await AppConfig.create_default_code_number();
    app.listen(PORT, () => {
        console.log('Server listen on port', PORT);
    })
}).catch((error) => {
    console.error(error);
});
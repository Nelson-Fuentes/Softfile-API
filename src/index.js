import * as DatabaseConfig from './app.database';
import app from './app.module'
import './app.email';
import * as AppConfig from './app.config';

const database_connection = DatabaseConfig.connect_database();
const PORT = process.env.SERVER_PORT;

database_connection.then(async(db) => {
    console.log('Database ' + process.env.DATABASE_NAME + ' connected.');
    await AppConfig.config_app();
    app.listen(process.env.PORT || PORT, () => {
        console.log('Server listen on port', PORT);
    })
}).catch((error) => {
    console.error(error);
});

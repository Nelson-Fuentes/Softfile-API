import * as DatabaseConfig from './app.database';
import app from './app.module'

const database_connection = DatabaseConfig.connect_database();

database_connection.then((db) => {
    console.log('Database ' + process.env.DATABASE + ' connected.')
}).catch((error) => {
    console.error(error);
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log('Server listen on port', PORT)
})
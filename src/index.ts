import express from 'express';
import bodyParser from 'body-parser';
import carRoutes from './routes/carRoutes';
import knex, { Knex } from 'knex'; // Import Knex dan tipe Knex
import knexConfig from './knexfile';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', carRoutes);


const db = knex(knexConfig.development);

const checkDatabaseConnection = async () => {
  try {
    const result = await db.raw('SELECT 1+1 as result');
    console.log('==========Database Connected Successfully==========');
  } catch (error: any) {
    console.error('Error Connecting to Database:', error.message);
  }
};
checkDatabaseConnection();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

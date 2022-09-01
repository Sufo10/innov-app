import mongoose from 'mongoose';
import config from '../config/config';

mongoose.connect(config.LOCAL_DB_URI);

mongoose.connection.on('connected', () => {
  console.log('Connected to DB');
});

mongoose.connection.on('error', () => {
  console.log('Mongoose Connection Error');
});

export default mongoose;
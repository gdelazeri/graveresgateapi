import mongoose from 'mongoose';
import log from './log';
import { DATABASE_CONNECTION_STRING } from './environment';

async function connect() {
  return mongoose
    .connect(DATABASE_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => {
      log.info('Database connected');
    })
    .catch(error => {
      console.log(error);
      log.error('Database not connected');
      process.exit(1);
    });
}

export default connect;

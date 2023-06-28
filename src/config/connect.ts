import mongoose from 'mongoose';
import log from './log';
import { DATABASE_CONNECTION_STRING } from './environment';

async function connect() {
  return mongoose
    .connect(DATABASE_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      log.info("Database connected");
    })
    .catch((error) => {
      log.error("Database not connected", error);
      process.exit(1);
    });
}

export default connect;
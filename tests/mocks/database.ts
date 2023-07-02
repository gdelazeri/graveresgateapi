import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
dotenv.config();

let mongod: MongoMemoryServer;

export async function connectDB() {
  try {
    let dbUrl = 'mongodb://username:password@localhost:27017';

    if (process.env.NODE_ENV === 'test') {
      mongod = await MongoMemoryServer.create();
      dbUrl = mongod.getUri();
    }

    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  } catch (e) {
    process.exit(1);
  }
};

export async function disconnectDB() {
  try {
    await mongoose.connection.close();
    if (mongod) {
      await mongod.stop();
    }
  } catch (e) {
    process.exit(1);
  }
};

export async function clearDB() {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();

    for (let i = 0; i < collections.length; i += 1) {
      await mongoose.connection.db.dropCollection(collections[i].name);
    }
  } catch (e) {
  }
}

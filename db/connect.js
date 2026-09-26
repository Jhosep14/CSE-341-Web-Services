import { MongoClient } from 'mongodb';

let _db;

export const initDb = async (callback) => {
  if (_db) {
    console.log('Database is already initialized!');
    return callback(null, _db);
  }

  if (!process.env.MONGODB_URI) {
    return callback(new Error('MONGODB_URI is not defined. Please set the MONGODB_URI environment variable.'));
  }

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    _db = client.db('contacts-data'); // Use the name of your database in Atlas
    console.log('Connected to MongoDB successfully!');
    callback(null, _db);
  } catch (err) {
    callback(err);
  }
};

export const getDb = () => {
  if (!_db) {
    throw new Error('Database not initialized!');
  }
  return _db;
};

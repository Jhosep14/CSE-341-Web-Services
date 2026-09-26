import { MongoClient } from 'mongodb';

let _db;

export const initDb = async (callback) => {
  if (_db) {
    console.log('Database is already initialized!');
    return callback(null, _db);
  }

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
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

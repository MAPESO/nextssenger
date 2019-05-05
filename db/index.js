// small hack to use mogoose
// reuses the cached connection
// the function return a connection db :)

/* eslint no-console: 0 */

const mongoose = require('mongoose');

let cachedDb = null;

module.exports = async () => {
  if (cachedDb) {
    console.log('> Using cached database instance');
    return Promise.resolve(cachedDb);
  }
  console.log('> DB is connected');
  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    ssl: true
  });
  cachedDb = db;
  return cachedDb;
};

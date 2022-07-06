import mongoose from 'mongoose';

export default async () => {
    let host = process.env.NODE_ENV === 'prod' ? process.env.MONGO_HOST : process.env.MONGO_HOST_TEST;
    let db = process.env.MONGO_DB;
    let username = process.env.MONGO_USER;
    let password = process.env.MONGO_PASS;
    let authSource = process.env.MONGO_AUTH;
    let uri = process.env.NODE_ENV === 'prod' ? `mongodb://${username}:${password}@${host}/${db}?authSource=${authSource}` :
        `mongodb://${username}:${password}@${host}/${db}?connectTimeoutMS=300000&replicaSet=rs0&authSource=${authSource}`
    try {
      await mongoose.connect(uri);
      console.log("Connected to the database: ", db);
    } catch (e) {
      console.error("Database connection failed:", e);
    }
};
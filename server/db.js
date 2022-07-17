import mongoose from 'mongoose';

export default async () => {
  let dacPortalHost = process.env.NODE_ENV === 'prod' ? process.env.MONGO_HOST_DAC_PORTAL : process.env.MONGO_HOST_DAC_PORTAL_TEST;
  let dacPortalDB = process.env.MONGO_DB_DAC_PORTAL;
  let username = process.env.MONGO_USER;
  let password = process.env.MONGO_PASS;
  let authSource = process.env.MONGO_AUTH;
  let dacPortalDBUri = process.env.NODE_ENV === 'prod' ? `mongodb://${username}:${password}@${dacPortalHost}/${dacPortalDB}?authSource=${authSource}` :
        `mongodb://${username}:${password}@${dacPortalHost}/${dacPortalDB}?connectTimeoutMS=300000&replicaSet=rs0&authSource=${authSource}`

  const connectToDACPortalDB = async () => {
    try {
      console.log("Connected to the DAC-Portal-DB")
      return await mongoose.connect(dacPortalDBUri)
    } catch (e) {
      console.error("Database connection failed:", e);
    }
  }
  
  await connectToDACPortalDB(dacPortalDBUri);
}

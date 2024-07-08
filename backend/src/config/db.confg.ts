import mongoose from 'mongoose';

const connectToDb = async () => {
    mongoose.connect(process.env.MONGO_URI!)
    .then((conn) => {console.log(`db connected: ${conn.connection.host}`);})
    .catch((e) => {console.log(`error in connected to db ${e.message}`);})
}

export default connectToDb;
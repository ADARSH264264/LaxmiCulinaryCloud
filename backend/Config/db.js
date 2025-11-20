import mongoose from 'mongoose';

export const connectDB = async () => {
  await mongoose
    .connect('mongodb+srv://adarshgaud5794_db_user:SubhLaxhmi123@cluster0.kkvk6zh.mongodb.net/CloudKitchen?retryWrites=true&w=majority')
    .then(() => console.log('DB CONNECTED'))
    .catch((err) => console.log('DB CONNECTION ERROR:', err.message));
};

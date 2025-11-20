// import express from 'express';
// import cors from 'cors';
// import 'dotenv/config';
// import { connectDB } from './Config/db.js';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import userRouter from './routes/userRoute.js';
// import itemRouter from './routes/itemRoute.js';
// import cartRouter from './routes/cartRoute.js'
// import orderRouter from './routes/orderRoute.js';
// const app = express();
// const port = process.env.PORT || 4000;

// // ✅ Fix for ES Modules (__dirname and __filename)
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // MIDDLEWARE
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       const allowedOrigins = [
//         'http://localhost:5173/',
//         'http://localhost:5174/',
//       ];

//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // DATABASE
// connectDB();

// // ROUTES
// app.use('/api/user', userRouter);
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/api/items', itemRouter);
// app.use('/api/cart' , cartRouter)
// app.use('/api/orders' , orderRouter )
// app.get('/', (req, res) => {
//   res.send('API WORKING');
// });

// // START SERVER
// app.listen(port, () => {
//   console.log(`Server started on http://localhost:${port}`);
// });



// import express from 'express';
// import cors from 'cors';
// import 'dotenv/config';
// import { connectDB } from './Config/db.js';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import userRouter from './routes/userRoute.js';
// import itemRouter from './routes/itemRoute.js';
// import cartRouter from './routes/cartRoute.js';
// import orderRouter from './routes/orderRoute.js';

// const app = express();
// const port = process.env.PORT || 4000;

// // ✅ Fix for ES Modules (__dirname and __filename)
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // MIDDLEWARE
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       const allowedOrigins = [
//         'http://localhost:5173',
//         'http://localhost:5174',
//          'http://localhost:5175' ,
//       ];

//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // DATABASE
// connectDB();

// // ROUTES
// app.use('/api/user', userRouter);
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/api/items', itemRouter);
// app.use('/api/cart', cartRouter);
// app.use('/api/orders', orderRouter); // ✅ Fixed slash here

// app.get('/', (req, res) => {
//   res.send('API WORKING');
// });

// // START SERVER
// app.listen(port, () => {
//   console.log(`Server started on http://localhost:${port}`);
// });
















import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './Config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';
import userRouter from './routes/userRoute.js';
import itemRouter from './routes/itemRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();
const port = process.env.PORT || 4000;

// ES Module dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --------------------  CORS  --------------------
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:5175',

        // 🚀 Ye add karega jab deploy karega —
        process.env.FRONTEND_URL, // Example: https://cloudkitchen.vercel.app
      ];

      // Allow if origin is in allowed list
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('CORS Not Allowed'));
      }
    },
    credentials: true,
  })
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -------------------- DB --------------------
connectDB();

// -------------------- ROUTES --------------------
app.use('/api/user', userRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/items', itemRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);

// -------------------- ROOT --------------------
app.get('/', (req, res) => {
  res.send('API Working fine!');
});

// -------------------- SERVER --------------------
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



















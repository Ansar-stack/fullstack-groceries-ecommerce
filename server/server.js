import express, { urlencoded } from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import {} from 'dotenv/config'
import { connectDB } from './src/configs/db.config.js';
import { ResponseMiddleware } from './src/middlewares/response.middleware.js';
import { ErrorMiddleware } from './src/middlewares/error.middleware.js';
import { userAuthMiddleware } from './src/middlewares/userAuth.middleware.js';

// Routes import
import userAuthRouter from './src/routes/userAuth.route.js';
import sellerAuthRouter from './src/routes/sellerAuth.route.js';
import addressRouter from './src/routes/address.route.js';

const app = express();

// Middlewares Configration
app.use(express.json({limit: "4kb"}));
app.use(cors({origin: ['http://localhost:5173'], credentials: true}));
app.use(cookieParser());
app.use(urlencoded({extended: true}));
app.use(ResponseMiddleware);

// Routes
app.use('/api/v1/user-auth/', userAuthRouter)
app.use('/api/v1/seller-auth/', sellerAuthRouter)
app.use('/api/v1/address/', userAuthMiddleware, addressRouter);

// Connect DB
connectDB();

// Error Middlware
app.use(ErrorMiddleware);

// Start Listening Server
app.listen(process.env.PORT, ()=>console.log(`Server listening at port ${process.env.PORT}`));


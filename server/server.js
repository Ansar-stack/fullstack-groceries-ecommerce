import express, { urlencoded } from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import {} from 'dotenv/config'
import { connectDB } from './src/configs/db.config.js';


const app = express();

// Middlewares Configration
app.use(express.json({limit: "4kb"}));
app.use(cors({origin: ['http://localhost:5173'], credentials: true}));
app.use(cookieParser());
app.use(urlencoded({extended: true}));

// Routes

// Connect DB
connectDB();

// Start Listening Server
app.listen(process.env.PORT, ()=>console.log(`Server listening at port ${process.env.PORT}`));

// Error Middlware

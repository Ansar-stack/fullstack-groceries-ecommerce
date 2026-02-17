import express, { urlencoded } from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import {} from 'dotenv/config'
import { ConnectDB } from './src/configs/db.configs/db.config.js';
import { ResponseMiddleware } from './src/middlewares/response.middleware.js';
import {ErrorMiddleware} from './src/middlewares/error.middleware.js';
import router from './src/routes/routes.js';


const app = express();

// Middlewares Configration
app.use(express.json({limit: "4kb"}));
app.use(cors({origin: ['http://localhost:5173'], credentials: true}));
app.use(cookieParser());
app.use(urlencoded({extended: true}));

// Response Middlewares
app.use(ResponseMiddleware);

// Router
app.use(router);
app.use((req, res)=>res.respond(404, "Route Not Found"));

// Connect DB
ConnectDB();
// Error Middlware
app.use(ErrorMiddleware);

// Start Listening Server
app.listen(process.env.PORT, ()=>console.log(`Server listening at port ${process.env.PORT}`));


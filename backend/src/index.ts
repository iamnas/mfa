import express, { json, urlencoded } from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import dbConnect from './config/dbConnect';
import 'dotenv/config'
import authRouter from './routes/auth.routes';
import './config/passport.config';



const app = express();

dbConnect();

// Middleware
const corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(json({ limit: '100mb' }));
app.use(urlencoded({ limit: '100mb', extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 *60 },
}))

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/v1/auth',authRouter);


// Listen app
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
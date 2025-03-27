const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const ServerConfig = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');

const userRouter = require('./routes/userRoute');
const authRouter = require('./routes/authRoute');
const contentRoutes = require("./routes/contentRoutes");
const advisoryRoutes = require("./routes/advisoryRoutes");

const app = express();

const corsOptions = {
    origin: '*', // Allow requests from any origin
    methods: 'GET,POST,PUT,DELETE,OPTIONS', // Allowed HTTP methods
    allowedHeaders: 'Content-Type,Authorization', // Allowed headers
};

app.use(cors(corsOptions));
app.use(cookieParser());
//app.use(bodyParser.json());
app.use(express.json());
//app.use(express.text());
app.use(express.urlencoded({ extended: true }));

// Routing middlewares
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use("/api", contentRoutes);
app.use("/api/advisory", advisoryRoutes);

app.get('/ping', (req, res) => {
    console.log(req.body);
    console.log(req.cookies);
    return res.json({ message: 'pong' });
});

// Start the server
app.listen(ServerConfig.PORT, async () => {
    await connectDB();
    console.log(`Server started at port ${ServerConfig.PORT}...!!`);
});
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const helmet = require('helmet');

// import router
const userRouter = require('./routes/user_route')

// init express
const app = express();

dotenv.config();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' })

app.use(helmet());
app.use(morgan('combined', { stream: accessLogStream }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/', userRouter);

app.all('*', (req, res, next) => {
	res.send({name: 'NoCaptchaAI Rest API', version: '1.1.3'})
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})
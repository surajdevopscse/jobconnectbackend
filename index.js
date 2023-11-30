const express = require('express')
const app = express()
const port = 3000
const dotenv  = require('dotenv');
const  mongoose = require('mongoose');
const  bodyParser = require('body-parser');
const jobRouter = require('./routes/job_routes');


dotenv.config()
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('connect with mongoose jobconnect db');
}).catch(err => console.log('error connecting',err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/api/jobs',jobRouter);

app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${process.env.PORT}!`));
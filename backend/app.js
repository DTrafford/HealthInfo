const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')

const tipRoutes = require('./routes/tips');
const patientRoutes = require('./routes/patient');
const postRoutes = require('./routes/posts');
const employeeRoutes = require('./routes/employee');
const conditionRoutes = require('./routes/conditions');

const app = express();

// mongoose.connect('mongodb+srv://admin:' + process.env.MONGO_ATLAS_PW + '@healthdata-rn5m8.mongodb.net/HealthData?retryWrites=true')
mongoose.connect('mongodb+srv://admin:admin@healthdata-rn5m8.mongodb.net/HealthData?retryWrites=true', {useNewUrlParser: true})
    .then(() => {
        console.log('Connected to DB');
    })
    .catch((err) => {
        console.log('Connection failed!');
    })

// Parse the json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false, limit:'50mb'}));
app.use("/images", express.static(path.join('images'))); // allows acces to the image folder

// Allow CORS accress
if (process.env.NODE_ENV !== 'production') {
    app.use(cors())
 }
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});

app.use(express.static('/build'));
app.use(express.static('/dist/PostApp'));
app.use('/api/tip', tipRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/condition', conditionRoutes);
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname + '/dist/PostApp/index.html'));

});

module.exports = app;


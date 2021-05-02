
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

//Dependies
const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, listening);

//call back
function listening(){
    console.log('server running');
    console.log(`running on localhost: ${port}`);
}

//get data
app.get('/allinfoupdate', updateallinfo)
function updateallinfo(req, res){
    res.send(projectData)
    console.log(projectData)
}

//POST Route
app.post('/infoweatheradd', addinfoweather);
function addinfoweather(req, res) {
    projectData.temperature = req.body.temperature;
    projectData.date = req.body.date;
    projectData.userinput = req.body.userinput;
    res.end();
    console.log(projectData)
}
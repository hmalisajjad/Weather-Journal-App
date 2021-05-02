/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=7b2e2d026df63966c2f09976b5680ebe&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() +1 +'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e){
    const zipCode = document.getElementById('zip').value;
    const contentFeeling = document.getElementById('feelings').value;
    
    getTempdata(baseURL, zipCode, apiKey)
    .then(function(data){
        //add data
        console.log(newDate)
        postData('/infoweatheradd', {temperature: data.main.temp, date: newDate, userinput: contentFeeling,})
        // update UI function
        .then(function(){
            updateUI()
        })
        
    })
}

const getTempdata = async (baseURL, zipCode, apiKey) =>{
    const res = await fetch(baseURL + zipCode + apiKey);
    try{
        const data = await res.json();
        console.log(data)
        return data;
    }
    catch(error){
        console.log("error", error);
    }
}

const postData = async (url = '', data = {}) => {
    const req = await fetch(url,{
        method: 'POST',
        credentials:'same-origin',
        headers:{
            'Content-Type': 'application/json',
        },
        //body data type should match Content-Type
        body: JSON.stringify({
            temperature: data.temperature,
            date: data.date,
            userinput: data.userinput
        }),

    })
    try {
        const newData = await req.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
        //approximately handle the error
    }
}
const updateUI = async () => {
    const req = await fetch('/allinfoupdate')
    try{
        const allData = await req.json()
       // console.log(allData);
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.userinput;
    }
    catch(error){
        console.log("error", error)
    }
}
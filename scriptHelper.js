// Write your helper functions here!
// require('isomorphic-fetch');

try {
    require('isomorphic-fetch');
    } catch (e) {
        //do nothing
    }

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
  
    let missionTarget = document.getElementById('missionTarget');
    missionTarget.innerHTML = `
                            <h2>Mission Destination</h2>
                            <ol>
                                <li>Name: ${name}</li>
                                <li>Diameter: ${diameter} </li>
                                <li>Star: ${star}</li>
                                <li>Distance from Earth: ${distance}</li>
                                <li>Number of Moons: ${moons}</li>
                            </ol>
                            <img src='${imageUrl}'>
                            `   
}

function validateInput(testInput) {

    if (testInput.length === 0 || testInput === "" || testInput === null || testInput === 0) {
        return `Empty`
    } else if ((!isNaN(testInput))) {
        return `Is a Number`
    } else {
        return `Not a Number`
    }
   
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    
    //DOM elements
    let pilotStatus = document.getElementById('pilotStatus');
    let copilotStatus = document.getElementById('copilotStatus');
    let fuelStatus = document.getElementById('fuelStatus');
    let launchStatus = document.getElementById('launchStatus');
    let cargoStatus = document.getElementById('cargoStatus');
    let errors = "";
    let errorCount = 0;

    //boolean variable for valid input    
    let fieldsBlank = false;    //tracker if some fields are blank

    //check all fields are filled
    if (validateInput(pilot) === `Empty`|| validateInput(copilot) === `Empty`|| 
    validateInput(fuelLevel) === `Empty`|| validateInput(cargoLevel) === `Empty`) {
        errors += `All fields are required\n`;
        errorCount++;
        fieldsBlank = true;
    }

    //check if pilot and co-pilot are strings
    if (validateInput(pilot) === `Is a Number`|| validateInput(copilot) === `Is a Number`) {
        errors += `Input a valid name for pilot or co-pilot\n`;
        errorCount++; 
    }

    //if name is a string but has some other characters other than letters or space
    if((!isNameValid(pilot) && pilot.trim().length > 0) || (!isNameValid(copilot) && copilot.trim().length > 0)){
        errors += `Input pilot or copilot name containing letters only\n`;
        errorCount++; 
    }

    //check if fuelLevel and cargoLevel are numbers
    if (validateInput(fuelLevel) === 'Not a Number' || validateInput(cargoLevel) === 'Not a Number') {
        numInput = false;
        errors += `Input a valid number for Fuel Level or Cargo Mass\n`;
        errorCount++;
    }

    //alert if errors exist
    if(errorCount > 0){
        alert(errors);
    }
    else {
        //update pilot/copilot status    
        pilotStatus.innerHTML = `Pilot ${pilot} is ready`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready`;
        list.style.visibility = 'hidden';
        }

    //check fuel level and update faulty items
    if (Number(fuelLevel) < 10000) {
        fuelStatus.innerHTML = `Not enough fuel for journey`;
        list.style.visibility = 'visible';
        launchStatus.innerHTML = `Shuttle not ready for launch`;
        launchStatus.style.color = `red`;
    }

    //check cargo level and update faulty items
    if (Number(cargoLevel) > 10000) {
        cargoStatus.innerHTML = `Cargo too heavy for takeoff`;
        list.style.visibility = `visible`;
        launchStatus.innerHTML = `Shuttle not ready for launch`;
        launchStatus.style.color = `red`;
    }

    //if fuel and cargo levels are within range, shuttle is ready to launch
    if (Number(cargoLevel) <= 10000 && Number(fuelLevel) >= 10000) {
        list.style.visibility = `visible`;
        fuelStatus.innerHTML = `Enough fuel for journey`;
        cargoStatus.innerHTML = `Cargo light enough for takeoff`;
        launchStatus.innerHTML = `Shuttle ready for launch`;
        launchStatus.style.color = `green`;
    }

    //if some fields are blank or some errors exist - it will continue to wait for new input until valid input is made
    if (fieldsBlank || errorCount > 0){
        list.style.visibility = `hidden`;
        launchStatus.innerHTML = `Awaiting Information Before Launch`;
        launchStatus.style.color = `black`;
    }
   
}

async function myFetch() {
    
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json()
        });
    return planetsReturned;

}

function pickPlanet(planets) {

    let i = Math.floor(Math.random() * planets.length);
    return planets[i];

}

function isNameValid(str) {
    //will check if string input for name contains only letters; a name may also contain a space or dash
    return /^[a-zA-Z\s-]+$/.test(str); 
}

// module.exports.addDestinationInfo = addDestinationInfo;
// module.exports.validateInput = validateInput;
// module.exports.formSubmission = formSubmission;
// module.exports.pickPlanet = pickPlanet; 
// module.exports.myFetch = myFetch;

try {
    module.exports.addDestinationInfo = addDestinationInfo;
    module.exports.validateInput = validateInput;
    module.exports.formSubmission = formSubmission;
    module.exports.pickPlanet = pickPlanet; 
    module.exports.myFetch = myFetch;
    } catch (e){
        //do nothing
    }

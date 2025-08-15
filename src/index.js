import "./style.css";
import helpers from "./app/helpers";

const searchLocationInput = document.querySelector("#search-input");
const searchLocationButton = document.querySelector(".search-button");

// const apiKey="21522390f9b0f28b34db2255350fa66a";

async function getData(url) {
    const response = await fetch(url);
    const weather = await response.json();
    return weather;
}
async function getWeather() {
    console.log("hey");
    try {
        let location = searchLocationInput.value;
        if (location) {
            location = location.replace(" ", ",");
            console.log(location);
            const coordResponse = await getData(
                helpers.getUrl(location).coordUrl
            );
            console.table(coordResponse);
            const coord = [coordResponse[0].lat, coordResponse[0].lon];
            console.log(coord);
            const weather = await getData(
                helpers.getUrl(location, coord).weatherUrl
            );
            console.table(weather);
        } else {
            throw new Error("please enter the location");
        }
    } catch (error) {
        console.log(error);
    }
}

searchLocationButton.addEventListener("click", getWeather);

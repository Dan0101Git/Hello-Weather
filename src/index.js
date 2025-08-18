import "./style.css";
import helpers from "./app/helpers";
import data from "./app/bundleData";
import render from "./render/render";
import City from "./app/city";

const searchLocationInput = document.querySelector("#search-input");
const searchLocationButton = document.querySelector(".search-button");

// const apiKey="21522390f9b0f28b34db2255350fa66a";

async function getWeather() {
    console.log("hey");
    try {
        let location = searchLocationInput.value;
        if (location) {
            location = location.replace(" ", ",");
            console.log(location);
            const time1 = helpers.getTime();
            const coordResponse = await helpers.getData(
                helpers.getUrl(location).coordUrl
            );
            console.log(helpers.getElapsedTime(time1));
            console.table(coordResponse);
            // console.log(data.bundleCoordData(coordResponse));
            const coordData = data.bundleCoordData(coordResponse);
            const coord = [coordData.coordinates[0], coordData.coordinates[1]];

            const time2 = helpers.getTime();
            const weather = await helpers.getData(
                helpers.getUrl(location, coord).weatherUrl
            );
            console.log(weather);
            //     helpers.buildMap(coord, coordData.name,weather.current.temp);
            data.bundleData(coordResponse, weather);
            const cityInstance = new City(data.getWeatherData());
            console.log(cityInstance.getCityData());
            helpers.updateState(cityInstance);
            console.log(helpers.getElapsedTime(time1));
        } else if (!location) {
            throw new Error("please enter the location");
        }
    } catch (error) {
        console.log(error);
    }
}

searchLocationButton.addEventListener("click", getWeather);

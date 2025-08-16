import dataState from "../dataState";
import render from "../render/render";

const apiKey = "21522390f9b0f28b34db2255350fa66a";
const mapApiKey = "c3438d2bec484858b1e2ad9c135fd18d";
let weatherUrl;
let mapTile;
let currentMarker;
const helpers = (function helpersModule() {
    function getUrl(location, coord) {
        const coordUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=10&appid=${apiKey}`;
        if (coord)
            weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coord[0]}&lon=${coord[1]}&appid=${apiKey}`;
        return { coordUrl, weatherUrl };
    }
    async function getData(url) {
        const response = await fetch(url);
        const weather = await response.json();
        return weather;
    }

    function getElapsedTime(timeStarted) {
        const currentTime = new Date();
        return `Elapsed ${currentTime - timeStarted} ms`;
    }
    function getTime() {
        return new Date();
    }
    function updateState(city) {
        dataState.currentCity = city;
        dataState.favLocationArr.push(city);
        render.renderDisplay(dataState);
    }
    return { getUrl, getData, getElapsedTime, getTime, updateState };
})();
export default helpers;

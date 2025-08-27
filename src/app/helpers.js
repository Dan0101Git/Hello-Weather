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
    function findSelectedLocation(dataId) {
        let selectedCity;
        dataState.favLocationArr.forEach((city) => {
            if (city.id === dataId) selectedCity = city;
        });
        return selectedCity;
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
    function searchCoordinates(favArray, cityQuery) {
        let flag = 1;
        favArray.forEach((city) => {
            if (
                city.coordinates[0] === cityQuery.coordinates[0] &&
                city.coordinates[1] === cityQuery.coordinates[1]
            ) {
                flag = 0;
            }
        });
        if (flag === 0) return true;
        return false;
    }
    function updateState(city) {
        dataState.currentCity = city;
        // dataState.mode = "main-card";
        console.log(JSON.parse(JSON.stringify(dataState)));
        render.renderDisplay(dataState);
    }
    function updateFavCollection() {
        try {
            if (dataState.currentCity) {
                const cityObj = dataState.currentCity;
                console.log(dataState.renderMode);
                if (!searchCoordinates(dataState.favLocationArr, cityObj)) {
                    dataState.favLocationArr.push(cityObj);
                    // dataState.mode = "side-bar";
                } else throw new Error("dupilcate city already exists");
            } else {
                throw new Error("please enter a city");
            }
        } catch (error) {
            console.log(error);
        }

        console.log(dataState.currentCity, dataState.favLocationArr);
    }
    function deleteFavLocation(dataId) {
        try {
            if (dataState.favLocationArr.length > 1) {
                dataState.favLocationArr = dataState.favLocationArr.filter(
                    (city) => city.id !== dataId
                );
            } else {
                throw new Error("cannot delete single location");
            }
        } catch (error) {
            console.log(error);
        }
    }
    return {
        getUrl,
        getData,
        getElapsedTime,
        getTime,
        updateState,
        updateFavCollection,
        findSelectedLocation,
        deleteFavLocation,
    };
})();
export default helpers;

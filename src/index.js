import "./style.css";
import helpers from "./app/helpers";
import data from "./app/bundleData";
import render from "./render/render";
import City from "./app/city";
import dataState from "./dataState";

const mainController = (() => {
    const searchLocationInput = document.querySelector("#search-input");
    const searchLocationButton = document.querySelector(".search-button");
    const addFavLocationButton = document.querySelector(".add-fav button");
    let globalCityValue;
    // const apiKey="21522390f9b0f28b34db2255350fa66a";
    function updateFavArray(arr) {
        const newArr = arr;
        for (let i = 0; i < dataState.favLocationArr.length; i++) {
            newArr[i] = data.bundleWeatherData(arr[i]);

            dataState.favLocationArr[i] = dataState.favLocationArr[
                i
            ].updateCityData(newArr[i]);
        }
    }
    async function getCityWeather() {
        let responseArr = [];
        try {
            let promiseArr = [];
            promiseArr = dataState.favLocationArr.map((city) =>
                helpers.getData(helpers.getUrl("", city.coordinates).weatherUrl)
            );
            responseArr = await Promise.all(promiseArr);
        } catch (error) {
            console.log(error);
        }
        console.log(JSON.parse(JSON.stringify(dataState)));

        updateFavArray(responseArr);
        return responseArr;
    }
    async function getWeather() {
        console.log("hey");
        try {
            let location = globalCityValue;
            let cityInstance;
            if (location) {
                location = location.replace(" ", ",");
                console.log(location);
                const time1 = helpers.getTime();
                const coordResponse = await helpers.getData(
                    helpers.getUrl(location).coordUrl
                );
                console.log(helpers.getElapsedTime(time1));
                console.table(coordResponse);
                const coordData = data.bundleCoordData(coordResponse);
                const coord = [
                    coordData.coordinates[0],
                    coordData.coordinates[1],
                ];

                const time2 = helpers.getTime();
                const weather = await helpers.getData(
                    helpers.getUrl(location, coord).weatherUrl
                );
                console.log(weather);
                data.bundleData(coordResponse, weather);
                const bundledData = data.getWeatherData();
                if (dataState.renderMode === "manual")
                    cityInstance = new City(bundledData);
                else
                    cityInstance =
                        dataState.currentCity.updateCityData(bundledData);
                console.log(bundledData);
                console.log(cityInstance);
                helpers.updateState(cityInstance);
                console.log(helpers.getElapsedTime(time1));
            } else if (!location) {
                throw new Error("please enter the location");
            }
        } catch (error) {
            console.log(error);
        }
    }
    addFavLocationButton.addEventListener("click", () => {
        dataState.renderMode = "manual";
        helpers.updateFavCollection();
    });
    searchLocationButton.addEventListener("click", () => {
        globalCityValue = searchLocationInput.value;
        dataState.renderMode = "manual";
        getWeather();
    });
    setInterval(async () => {
        dataState.renderMode = "auto";
        await getWeather();
        console.log(JSON.parse(JSON.stringify(dataState)));
        await getCityWeather();
        console.log(JSON.parse(JSON.stringify(dataState)));

        helpers.updateFavCollection();
        console.log(dataState);
    }, 360000);
})();

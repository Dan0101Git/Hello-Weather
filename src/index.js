import "./style.css";
import helpers from "./app/helpers";
import data from "./app/bundleData";
import render from "./render/render";
import City from "./app/city";
import dataState from "./dataState";
import rendHlper from "./render/renderHelpers";
import loadGif from "./images/loading.gif";

const mainController = (() => {
    const searchLocationInput = document.querySelector("#search-input");
    const searchLocationButton = document.querySelector(".search-button");
    const addFavLocationButton = document.querySelector(".add-fav button");
    const favCityListItem = document.querySelector("#fav-city");
    const tempCard = document.querySelector(".current-weather-wrapper");
    const currentWeather = document.querySelector(".current-weather");
    const gifImg = document.createElement("img");
    gifImg.src = loadGif;
    gifImg.classList.add("load");

    const notFoundError = document.createElement("p");
    notFoundError.classList.add("not-found");
    const units = document.querySelector(".temp");
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
        try {
            let location = globalCityValue;
            let cityInstance;
            if (location) {
                location = location.replace(" ", ",");
                const time1 = helpers.getTime();
                const coordResponse = await helpers.getData(
                    helpers.getUrl(location).coordUrl
                );
                console.log(helpers.getElapsedTime(time1), coordResponse);
                if (coordResponse.length === 0) {
                    console.log(coordResponse);
                    throw new Error("Location doesn't Exist in the Db!");
                }
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
                cityInstance = new City(bundledData);

                helpers.updateState(cityInstance);
                console.log(helpers.getElapsedTime(time1));
            } else if (!location) {
                throw new Error("please enter the location");
            }
        } catch (error) {
            // eslint-disable-next-line no-alert
            console.log(error);
            rendHlper.resetRender(tempCard);
            console.log(tempCard);
            notFoundError.textContent = error;
            currentWeather.appendChild(notFoundError); // added to show loaded stuff
        }
    }
    async function updateGlobalWeatherObject() {
        rendHlper.resetRender(tempCard);
        console.log(tempCard);
        currentWeather.appendChild(gifImg); // added to show loaded stuff

        await getCityWeather();
        await getWeather();
    }
    async function updateStaticLocation(liveCity) {
        try {
            if (liveCity) {
                await getCityWeather();
                helpers.updateState(liveCity);
            } else {
                throw new Error("no city selectedd");
            }
        } catch (error) {
            console.log(error);
        }
    }
    units.addEventListener("click", async (e) => {
        let unitSelected = e.target.closest(".unit");
        if (unitSelected && dataState.unit !== unitSelected.id[0]) {
            unitSelected = e.target.closest(".unit");

            // eslint-disable-next-line prefer-destructuring
            dataState.unit = unitSelected.getAttribute("id");
            updateStaticLocation(dataState.currentCity);
        }

        // eslint-disable-next-line prefer-destructuring
    });
    async function deleteLocation(e) {
        const cityElementSelected = e.target.closest(".city-list-item");
        console.log(cityElementSelected);
        helpers.deleteFavLocation(cityElementSelected.getAttribute("data-id"));
        updateStaticLocation(dataState.favLocationArr[0]);
    }
    favCityListItem.addEventListener("click", async (e) => {
        if (e.target.closest(".delete-location")) deleteLocation(e);
        else if (e.target.closest(".city-list-item")) {
            const cityElementSelected = e.target.closest(".city-list-item");
            console.log(cityElementSelected);
            const selectedCity = helpers.findSelectedLocation(
                cityElementSelected.getAttribute("data-id")
            );
            console.log(selectedCity);
            updateStaticLocation(selectedCity);
        }
    });
    addFavLocationButton.addEventListener("click", async () => {
        dataState.renderMode = "manual";
        helpers.updateFavCollection();
        updateStaticLocation(dataState.currentCity);
    });

    searchLocationButton.addEventListener("click", async () => {
        globalCityValue = searchLocationInput.value;
        await updateGlobalWeatherObject();
    });
    globalCityValue = "leh";
    updateGlobalWeatherObject();

    window.addEventListener("keyup", async (e) => {
        if (e.key === "Enter" && e.target.matches("#search-input")) {
            globalCityValue = searchLocationInput.value;
            await updateGlobalWeatherObject();
        }
        console.log(e.target);
    });
    setInterval(async () => {
        updateStaticLocation(dataState.currentCity);
    }, 3600000); // update every 1 hour
})();

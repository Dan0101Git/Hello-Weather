import dataState from "../dataState";
import rendHlper from "./renderHelpers";
import humidC from "../images/icons/humid-c.svg";
import windC from "../images/icons/wind-c.svg";
import popC from "../images/icons/pop-c.svg";
import visbilityC from "../images/icons/visbility-c.svg";
import uviC from "../images/icons/uvi-c.svg";

const renderAdditional = (() => {
    const mainWrapper = document.querySelector(".current-weather-wrapper");
    const hourlyDaily = document.querySelector(".hourly-daily");
    let adiv;

    function createBox(property) {
        const boxItem = document.createElement("div");
        boxItem.classList.add("add-item-box");
        boxItem.innerHTML = `<div class="property"><span class="add-data-icon"><img class="add-data-icon-img" src=${property.icon}></span><span class="add-image-title">${property.title}</span></div><span class="add-data-data">${property.data}</span>`;
        return boxItem;
    }
    function getHumidity(city) {
        return {
            title: "Humidity",
            data: `${city.currentData.humidity} %`,
            icon: humidC,
        };
    }
    function getFeelTemp(city) {
        return {
            title: "Feels Like",
            data: `${rendHlper.getTempinC(city.currentData.feels_like)}°`,
            icon: popC,
        };
    }
    function getWind(city) {
        return {
            title: "Wind Speed",
            data: `${parseInt((city.currentData.wind_speed * 18) / 5, 10)} km/h`,
            icon: windC,
        };
    }
    function getVisibility(city) {
        return {
            title: "Visbility",
            data: `${parseInt(city.currentData.visibility / 1000, 10)} km`,
            icon: visbilityC,
        };
    }
    function getUvi(city) {
        return {
            title: "UV Index",
            data: parseInt(city.currentData.uvi * 10, 10) / 10,
            icon: uviC,
        };
    }
    function makeAdditionalCarousel(data) {
        const mainCarouselDiv = document.querySelector(".data-carousel");

        const makeFns = [
            getHumidity,
            getFeelTemp,
            getWind,
            getVisibility,
            getUvi,
        ];
        const carouselDiv = document.createElement("div");
        carouselDiv.classList.add("add-data-carousel");
        makeFns.forEach((makeFunction) => {
            const box = createBox(makeFunction(data.currentCity));
            carouselDiv.appendChild(box);
        });
        mainCarouselDiv.appendChild(carouselDiv);
        console.log("hey");
        return carouselDiv;
    }

    return { makeAdditionalCarousel };
})();
export default renderAdditional;

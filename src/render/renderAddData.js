import dataState from "../dataState";
import rendHlper from "./renderHelpers";
import humidC from "../images/icons/humid-c.svg";
import windC from "../images/icons/wind-c.svg";
import popC from "../images/icons/pop-c.svg";
import visibilityC from "../images/icons/visbility-c.svg";
import uviC from "../images/icons/uvi-c.svg";
import humidCd from "../images/icons/humid-cd.svg";
import windCd from "../images/icons/wind-cd.svg";
import popCd from "../images/icons/pop-cd.svg";
import visibilityCd from "../images/icons/visibility-cd.svg";
import uviCd from "../images/icons/uvi-cd.svg";
import humidR from "../images/icons/humid-r.svg";
import windR from "../images/icons/wind-r.svg";
import popR from "../images/icons/pop-r.svg";
import visibilityR from "../images/icons/visibility-r.svg";
import uviR from "../images/icons/uvi-r.svg";

const renderAdditional = (() => {
    const mainWrapper = document.querySelector(".current-weather-wrapper");
    const hourlyDaily = document.querySelector(".hourly-daily");
    let weatherCond;
    let adiv;
    const icons = {
        humid: { clear: humidC, clouds: humidCd, rain: humidR },
        wind: { clear: windC, clouds: windCd, rain: windR },
        pop: { clear: popC, clouds: popCd, rain: popR },
        visibility: {
            clear: visibilityC,
            clouds: visibilityCd,
            rain: visibilityR,
        },
        uvi: { clear: uviC, clouds: uviCd, rain: uviR },
    };

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
            icon: icons.humid[weatherCond],
        };
    }
    function getFeelTemp(city) {
        return {
            title: "Feels Like",
            data: `${rendHlper.getTempinC(city.currentData.feels_like)}°`,
            icon: icons.pop[weatherCond],
        };
    }
    function getWind(city) {
        return {
            title: "Wind Speed",
            data: `${parseInt((city.currentData.wind_speed * 18) / 5, 10)} km/h`,
            icon: icons.wind[weatherCond],
        };
    }
    function getVisibility(city) {
        return {
            title: "Visbility",
            data: `${parseInt(city.currentData.visibility / 1000, 10)} km`,
            icon: icons.visibility[weatherCond],
        };
    }
    function getUvi(city) {
        return {
            title: "UV Index",
            data: parseInt(city.currentData.uvi * 10, 10) / 10,
            icon: icons.uvi[weatherCond],
        };
    }
    function makeAdditionalCarousel(data) {
        const mainCarouselDiv = document.querySelector(".data-carousel");
        weatherCond = document.querySelector(".temp").getAttribute("id");
        console.log(weatherCond);
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

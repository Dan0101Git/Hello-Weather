import dataState from "../dataState";
import rendHlper from "./renderHelpers";

const renderSidebar = (() => {
    function sortData() {}
    function makeListItem(city) {
        const cityListItem = document.createElement("li");
        cityListItem.classList.add("city-list-item");
        if (dataState.currentCity.id === city.id)
            cityListItem.classList.add("location-on");
        cityListItem.setAttribute("data-id", city.id);
        const todayWeatherArray = city.dailyData[0];
        const upperSecHtml = ` <div class="left"><span class="city-title">${city.name}</span><span class="city-time">${rendHlper.getDate(city.currentData.dt, city.offset).graphTime}</span></div>
                            <div class="right"><span class=current-temp-list>${rendHlper.getTempinC(city.currentData.temp)}°</span></div>`;
        const lowerSecthtml = `<div><span class="weather-list-descrip">${city.currentData.weather[0].description}</span><span class="city-list-minmax">H:${rendHlper.getTempinC(todayWeatherArray.temp.max)}° L:${rendHlper.getTempinC(todayWeatherArray.temp.min)}°</span></div>
`;
        cityListItem.innerHTML = `<div class="uppersec">${upperSecHtml}</div><div class="lower-sec">${lowerSecthtml}</div>`;
        cityListItem.innerHTML += `<hr class="x-line">`;
        return cityListItem;
    }
    function makeSidebar(dataObject) {
        const cityList = document.querySelector(".city-list");
        const favCityList = document.querySelector("#fav-city");

        const cityArr = dataObject.favLocationArr;
        rendHlper.resetRender(cityList);
        cityArr.forEach((city) => {
            favCityList.appendChild(makeListItem(city));
        });
    }

    return { sortData, makeSidebar };
})();
export default renderSidebar;

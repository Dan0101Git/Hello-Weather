import rendHlper from "./renderHelpers";

const renderWeekly = (() => {
    function makeListItem(data, timeOffset) {
        const dayListItem = document.createElement("li");
        dayListItem.classList.add("day-list-item");
        console.log(data.dt);
        const thisDay = rendHlper.getDate(data.dt, timeOffset).weekDay;
        const weatherIcon = data.weather[0].icon;
        const weatherIconUrl = rendHlper.getIcon(weatherIcon);
        const highTemp = rendHlper.getTempinC(data.temp.max);
        const lowTemp = rendHlper.getTempinC(data.temp.min);

        const SecHtml = ` <div class="left"><span class="day-title">${thisDay}</span><span class="weather-icon"><img src=${weatherIconUrl}></span></div>
                            <div class="right"><span class="low-grad">${lowTemp}°</span><span class="temp-grad"></span><span class="low-grad" >${highTemp}°</span></div>`;

        dayListItem.innerHTML = `<div class="uppersec">${SecHtml}</div>`;
        dayListItem.innerHTML += `<hr class="x-line">`;
        return dayListItem;
    }
    function makeweeklyCarousel(cityData) {
        const forecastList = document.querySelector(".forecast-list");

        const mailWeeklyUl = document.querySelector("#weekly-forecast");

        rendHlper.resetRender(forecastList);
        const weatherDataArr = cityData.currentCity.dailyData;
        weatherDataArr.forEach((day) => {
            const dayList = makeListItem(day, cityData.currentCity.offset);
            mailWeeklyUl.appendChild(dayList);
        });

        return mailWeeklyUl;
    }
    return { makeweeklyCarousel };
})();
export default renderWeekly;

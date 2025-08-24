import rendHlper from "./renderHelpers";

const renderWeekly = (() => {
    let leftPos = 0;
    const mailWeeklyUl = document.querySelector("#weekly-forecast");
    function moveDiv(timestamp) {
        leftPos += 1;
        mailWeeklyUl.style.left = `${leftPos}px`;
        console.log(Array.from(mailWeeklyUl.children)[0]);
        const list = Array.from(mailWeeklyUl.children)[0];
        console.log(parseFloat(window.getComputedStyle(list).width));
        console.log(window.getComputedStyle(list).width * 8);
        requestAnimationFrame(moveDiv);
    }
    function duplicateList(listArray, elem) {
        listArray.forEach((listItem) => {
            const duplicate = listItem.cloneNode(true);
            elem.appendChild(duplicate);
        });
    }

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

        return dayListItem;
    }
    function makeweeklyCarousel(cityData) {
        const forecastList = document.querySelector(".forecast-list");

        rendHlper.resetRender(forecastList);
        const weatherDataArr = cityData.currentCity.dailyData;
        weatherDataArr.forEach((day) => {
            const dayList = makeListItem(day, cityData.currentCity.offset);
            mailWeeklyUl.appendChild(dayList);
        });
        // requestAnimationFrame(moveDiv)
        duplicateList(Array.from(mailWeeklyUl.children), mailWeeklyUl);
        return mailWeeklyUl;
    }
    return { makeweeklyCarousel };
})();
export default renderWeekly;

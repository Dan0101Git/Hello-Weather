import dataState from "../dataState";

const apiKey = "21522390f9b0f28b34db2255350fa66a";
const mapApiKey = "c3438d2bec484858b1e2ad9c135fd18d";
const displayContainer = document.querySelector(".temp .current-weather");
const iconContainer = document.querySelector(".temp .hourly-daily");
let hourlyChart;

let mapTile;
let currentMarker;

const rendHlper = (function renderHelpers() {
    function getColor(mode) {
        if (mode === "clouds") {
            return "rgb(123, 152, 246)";
        }
        if (mode === "rain") {
            return "rgb(0, 189, 176)";
        }
        return "rgba(250, 243, 159, 0.82)";
    }
    function resetRender(div) {
        let tempChildren;
        if (div.children) tempChildren = Array.from(div.children);

        tempChildren.forEach((child) => {
            let grandChildDiv;
            if (child.children) grandChildDiv = Array.from(child.children);
            grandChildDiv.forEach((grandChild) => {
                if (grandChild.matches(".hourly-chart")) return;
                grandChild.remove();
            });
        });
    }

    function getTempinC(tempinK) {
        const tempC = parseInt(tempinK - 273, 10);
        const tempF = parseInt((tempC * 9) / 5 + 32, 10);
        const temp = dataState.unit === "c" ? tempC : tempF;
        return temp;
    }
    function getDate(numberDate, offset) {
        const date = new Date((numberDate + offset - 19800) * 1000);
        const today = new Date();
        const options1 = { day: "2-digit", month: "short", year: "numeric" };
        const currentDate = date.toLocaleDateString("en-GB", options1);
        const options2 = { hour: "2-digit", minute: "2-digit", hour12: true };
        const options3 = { hour: "2-digit", minute: "2-digit", hour12: false };
        const options4 = { weekday: "short" };
        const weekDay = date.toLocaleDateString("en-US", options4);
        const currentTime = date.toLocaleTimeString("en-GB", options2);
        const graphTime = date.toLocaleTimeString("en-GB", options3);
        return { currentDate, currentTime, graphTime, weekDay };
    }
    function getHourlyData(data) {
        const hourlyDataArr = data.hourlyData;
        const tempArr = [];
        const timeArr = [];
        for (let i = 0; i <= hourlyDataArr.length / 2; i += 5) {
            const time = getDate(hourlyDataArr[i].dt, data.offset).graphTime;
            const temp = getTempinC(hourlyDataArr[i].temp);
            tempArr.push(temp);
            timeArr.push(time);
        }
        return { tempArr, timeArr };
    }
    function getChartObject(cityData, gradientData) {
        const hourlyDataObj = getHourlyData(cityData);
        const maxValue = Math.max(...hourlyDataObj.tempArr);
        const buffer = maxValue * 0.1;
        const minValue = Math.min(...hourlyDataObj.tempArr);
        const minBuffer = minValue * 0.1;
        const dotColor = getColor(
            document.querySelector(".temp").getAttribute("id")
        );
        return {
            type: "line", // The type of chart
            data: {
                labels: hourlyDataObj.timeArr, // Your time labels
                datasets: [
                    {
                        label: "Temperature", // This is hidden but good for context
                        data: hourlyDataObj.tempArr, // Your temperature data
                        borderColor: dotColor, // Line color
                        borderWidth: 2,
                        pointBackgroundColor: "#FFFFFF", // Point color
                        fill: true, // Fill the area under the line
                        backgroundColor: gradientData, // Use the gradient for the fill
                        tension: 0.4, // Makes the line smooth and curved
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false, // Hide the legend box
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => `${context.parsed.y}°`,
                        },
                    },
                    datalabels: {
                        display: true,

                        offset: 3, // Pixels of space above the dot
                        font: {
                            size: 11,
                            weight: "bold",
                        },

                        anchor: "end",
                        align: "end",
                        clip: false,
                        clamp: false,
                        labels: {
                            value: {
                                color: "white",
                            },
                        },
                        // This function formats the text of the label
                        formatter: (value, context) => `${value}°`,
                    },
                },

                scales: {
                    y: {
                        // Y-axis (temperature)
                        display: false, // Hide the Y-axis labels and grid
                        beginAtZero: false,
                        suggestedMax: maxValue + buffer,
                        suggestedMin: minValue - minBuffer,
                    },
                    x: {
                        // X-axis (time)
                        grid: {
                            display: false, // Hide the X-axis grid lines
                        },
                        ticks: {
                            color: "rgba(255, 255, 255, 0.72)", // Color of the time labels
                        },
                    },
                },
            },
        };
    }
    function createChart(cityData) {
        const ctx = document
            .getElementById("hourlyForecastChart")
            .getContext("2d");
        const gradient = ctx.createLinearGradient(0, 0, 0, 110);
        const hourlyDataObj = getHourlyData(cityData);
        gradient.addColorStop(
            0,
            getColor(document.querySelector(".temp").getAttribute("id"))
        );
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        if (hourlyChart) hourlyChart.destroy();
        Chart.register(ChartDataLabels);
        hourlyChart = new Chart(ctx, getChartObject(cityData, gradient));
    }

    function createMap(coord) {
        const map = L.map("map", {
            center: coord,
            zoom: 7,
        });
        const personalapi = "309145bb-921b-4717-90f0-28436fdc48b9";
        L.tileLayer(
            // "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
            `https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png`,
            {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                apiKey: personalapi,
            }
        ).addTo(map);
        L.tileLayer(``, { className: "weather-tile-layer" }).addTo(map);
        return map;
    }
    function buildMap(coord, tempinK) {
        if (!mapTile) {
            mapTile = createMap(coord);
        } else {
            mapTile.setView(coord, 7);
        }
        if (currentMarker) {
            mapTile.removeLayer(currentMarker);
        }
        currentMarker = L.circleMarker(coord, {
            radius: 8,
            fillColor: "#0a0a0a", // Orange fill
            color: "#000", // Black border
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8,
            display: "none",
        })
            .addTo(mapTile)
            .bindPopup(`${getTempinC(tempinK)}`)
            .openPopup();
    }
    function getUnit() {
        const currentUnit = "C";
        return currentUnit;
    }

    function displayCurrentWeather(iconUrl, temp, unit, city) {
        const todayWeatherArray = city.dailyData[0];
        const currentUnit = dataState.unit;
        const currentTempDiv = document.createElement("div");
        const tempCard = document.querySelector(".temp");

        tempCard.setAttribute(
            "id",
            `${city.currentData.weather[0].main.toLowerCase()}`
        );
        currentTempDiv.classList.add("temp-icon");
        const weatherDescriptHtml = `<div class="weather-descrip"><span>${city.currentData.weather[0].description}</span></div>`;
        const minMaxHtml = `<div class="weather-minmax"><span>H:${getTempinC(todayWeatherArray.temp.max)}° L:${getTempinC(todayWeatherArray.temp.min)}°</span></div>`;
        currentTempDiv.innerHTML = `<div><span id="current-temp">${temp}°</span><span class="units"><span class="unit cel" id="c">C</span><span>|</span><span class="unit fah" id="f">F</span></span>${weatherDescriptHtml}${minMaxHtml}</div><div class="icon"><span class="current-icon"><img src=${iconUrl}></span></div>`;

        return currentTempDiv;
    }
    function getIcon(icon) {
        // const mainWeatherTypes={
        //   //  Clear,Clouds,Thunderstorm,Drizzle,Rain,Snow,Atmosphere
        // }
        return `https://raw.githubusercontent.com/Dan0101Git/Hello-Weather/refs/heads/main/src/images/icons/${icon}.svg`;
    }
    function renderLocationAddress(address) {
        const weatherIcon = address.currentData.weather[0].icon;
        const weatherIconUrl = getIcon(weatherIcon);
        const currentDatenTime = getDate(
            address.currentData.dt,
            address.offset
        );
        const dateNTimeHtml = `<div class="date-time"><span>${currentDatenTime.currentDate}</span><span>${currentDatenTime.currentTime}</span></div>`;
        const addresssDiv = document.createElement("div");
        addresssDiv.classList.add("address-div");
        const cityState = address.state ? address.state : "";

        addresssDiv.innerHTML += `<div>${dateNTimeHtml}<span class="city-name">${address.name}</span></div><div class="address-secondary"><span>${cityState}</span></div>`;
        displayContainer.appendChild(addresssDiv);
        displayContainer.appendChild(
            displayCurrentWeather(
                weatherIconUrl,
                getTempinC(address.currentData.temp),
                getUnit(),
                address
            )
        );
        document.getElementById(dataState.unit).classList.add("on");
    }

    return {
        getDate,
        getTempinC,
        resetRender,
        buildMap,
        renderLocationAddress,
        createChart,
        getIcon,
    };
})();
export default rendHlper;

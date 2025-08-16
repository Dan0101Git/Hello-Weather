const apiKey = "21522390f9b0f28b34db2255350fa66a";
let weatherUrl;
const mapContainer = document.querySelector("#map");
let mapTile;
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
    function createMap(coord) {
        const map = L.map("map", {
            center: coord,
            zoom: 8,
        });
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
        return map;
    }
    function buildMap(coord, name) {
        let map;
        if (!mapTile) {
            mapTile = createMap(coord);
            console.log(mapTile);
        } else {
            mapTile.setView(coord, 8);
            L.marker(coord).addTo(mapTile).bindPopup(name).openPopup();
        }
        console.log(mapTile);
    }

    function getElapsedTime(timeStarted) {
        const currentTime = new Date();
        return `Elapsed ${currentTime - timeStarted} ms`;
    }
    function getTime() {
        return new Date();
    }
    return { getUrl, getData, buildMap, getElapsedTime, getTime };
})();
export default helpers;

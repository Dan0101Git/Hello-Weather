const apiKey = "21522390f9b0f28b34db2255350fa66a";
let weatherUrl;

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
    return { getUrl, getData };
})();
export default helpers;

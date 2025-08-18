const data = (function getData() {
    let coordData;
    let weatherData;
    function bundleCoordData(coord) {
        const firstCity = coord[0];
        coordData = {
            name: firstCity.name,
            state: firstCity.state,
            country: firstCity.country,
            coordinates: [firstCity.lat, firstCity.lon],
        };
        return coordData;
    }
    function bundleWeatherData({
        current,
        hourly,
        daily,
        timezone_offset: timezoneOffset,
    }) {
        console.log();
        weatherData = {
            current,
            hourly,
            daily,
            timezoneOffset,
        };
        return weatherData;
    }
    function bundleData(coord, weather) {
        bundleCoordData(coord);
        bundleWeatherData(weather);
        // console.log(coordData,weatherData);
    }
    function getWeatherData() {
        return Object.assign(coordData, weatherData);
    }
    return { bundleData, bundleCoordData, bundleWeatherData, getWeatherData };
})();
export default data;

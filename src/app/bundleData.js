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
        current: currentData,
        hourly: hourlyData,
        daily: dailyData,
        timezone_offset: offset,
    }) {
        console.log();
        weatherData = {
            currentData,
            hourlyData,
            dailyData,
            offset,
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

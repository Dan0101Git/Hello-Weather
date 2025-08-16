import data from "./bundleData";

class City {
    constructor(weatherData) {
        this.name = weatherData.name;
        this.state = weatherData.state;
        this.country = weatherData.country;
        this.coordinates = weatherData.coordinates;
        this.currentData = weatherData.current;
        this.hourlyData = weatherData.hourly;
        this.dailyData = weatherData.daily;
    }

    getCityData() {
        return this;
    }
}
export default City;

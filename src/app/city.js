import data from "./bundleData";

class City {
    constructor(weatherData) {
        this.name = weatherData.name;
        this.state = weatherData.state;
        this.country = weatherData.country;
        this.coordinates = weatherData.coordinates;
        this.currentData = weatherData.currentData;
        this.hourlyData = weatherData.hourlyData;
        this.dailyData = weatherData.dailyData;
        this.offset = weatherData.offset;
    }

    getCityData() {
        return this;
    }

    updateCityData(updatedData) {
        Object.assign(this, updatedData);
        return this;
    }
}
export default City;

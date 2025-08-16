const data = (function getData() {
    function bundleCoordData(coord) {
        const firstCity = coord[0];
        return {
            name: firstCity.name,
            state: firstCity.state,
            country: firstCity.country,
            coordinates: [firstCity.lat, firstCity.lon],
        };
    }
    return { bundleCoordData };
})();
export default data;

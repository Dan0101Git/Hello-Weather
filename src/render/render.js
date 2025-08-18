import rendHlper from "./renderHelpers";

const render = (function renderWeather() {
    let addressName;

    function renderDisplay(dataState) {
        let addresssDiv;
        const city = dataState.currentCity;
        const citiesArr = dataState.favLocationArr;
        console.log(dataState);
        addressName = city;
        // console.log(address);
        if (document.querySelector(".address-div")) {
            addresssDiv = document.querySelector(".temp");
            rendHlper.resetRender(addresssDiv);
        }

        rendHlper.renderLocationAddress(addressName);
        rendHlper.buildMap(
            addressName.coordinates,
            addressName.currentData.temp
        );
        rendHlper.createChart();
    }

    return { renderDisplay };
})();
export default render;

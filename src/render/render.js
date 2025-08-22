import rendHlper from "./renderHelpers";
import renderSidebar from "./renderSidebar";
import renderAdditional from "./renderAddData";

const render = (function renderWeather() {
    let addressName;

    function renderDisplay(dataState) {
        let addresssDiv;
        const city = dataState.currentCity;
        const citiesArr = dataState.favLocationArr;

        console.log(JSON.parse(JSON.stringify(dataState)));
        addressName = city;
        // console.log(address);
        if (document.querySelector(".address-div")) {
            addresssDiv = document.querySelector(".temp");
            rendHlper.resetRender(addresssDiv);
        }
        console.log(JSON.parse(JSON.stringify(addressName)));
        rendHlper.renderLocationAddress(addressName);
        renderAdditional.makeAdditionalCarousel(dataState);
        rendHlper.buildMap(
            addressName.coordinates,
            addressName.currentData.temp
        );
        rendHlper.createChart(addressName);
        renderSidebar.makeSidebar(dataState);
        return null;
    }

    return { renderDisplay };
})();
export default render;

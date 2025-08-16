import rendHlper from "./renderHelpers";

const displayContainer = document.querySelector(".container");
const render = (function renderWeather() {
    let address;
    function renderLocationAddress(coordData) {
        const addresssDiv = document.createElement("div");
        addresssDiv.classList.add("address-div");
        addresssDiv.innerHTML += `<h1>${address.name}</h1><h2>${address.state}</h2><h3>${address.country}</h3>`;
        displayContainer.appendChild(addresssDiv);
    }
    function renderDisplay(dataState) {
        let addresssDiv;
        const city = dataState.currentCity;
        const citiesArr = dataState.favLocationArr;
        console.log(dataState);
        address = city;
        // console.log(address);
        if (document.querySelector(".address-div")) {
            addresssDiv = document.querySelector(".address-div");
            rendHlper.resetRender(addresssDiv);
        }
        renderLocationAddress();
    }

    return { renderDisplay };
})();
export default render;

import data from "../app/bundleData";

const displayContainer = document.querySelector(".container");
const render = (function renderWeather() {
    const address = data.bundleCoordData;

    function renderLocationAddress() {
        const addresssDiv = document.createElement("div");
        addresssDiv.innerHTML += `<h1>${address.name}</h1><h2>${address.state}</h2><h3>${address.country}</h3>`;
        displayContainer.appendChild(addresssDiv);
    }
    renderLocationAddress();
})();

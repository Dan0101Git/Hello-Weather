const apiKey = "21522390f9b0f28b34db2255350fa66a";
const mapApiKey = "c3438d2bec484858b1e2ad9c135fd18d";
let mapTile;
let currentMarker;
const rendHlper = (function renderHelpers() {
    function resetRender(div) {
        div.remove();
    }

    function createMap(coord) {
        const map = L.map("map", {
            center: coord,
            zoom: 7,
        });
        L.tileLayer(
            // "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
            `https://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey=${mapApiKey}`,
            {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }
        ).addTo(map);
        L.tileLayer(
            `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`,
            { className: "weather-tile-layer" }
        ).addTo(map);
        return map;
    }
    function getTempinC(tempinK) {
        return parseInt((tempinK - 273) * 10, 10) / 10;
    }
    function buildMap(coord, name, tempinK) {
        if (!mapTile) {
            mapTile = createMap(coord);
            console.log(mapTile);
        } else {
            mapTile.setView(coord, 7);
        }
        if (currentMarker) {
            mapTile.removeLayer(currentMarker);
        }
        currentMarker = L.circleMarker(coord, {
            radius: 8,
            fillColor: "#0a0a0a", // Orange fill
            color: "#000", // Black border
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8,
            display: "none",
        })
            .addTo(mapTile)
            .bindPopup(`${getTempinC(tempinK)}`)
            .openPopup();
        console.log(mapTile);
    }
    return { resetRender, createMap };
})();
export default rendHlper;

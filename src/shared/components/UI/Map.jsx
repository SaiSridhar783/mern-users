import React from "react";

import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const Map = ReactMapboxGl({
    accessToken:
        "pk.eyJ1Ijoic2Fpc3JpZGhhciIsImEiOiJja3F4Z3V0YncwMHB1MndzNmIyZjhrMTMxIn0.K4KHxCX8T3rGbNCGMesXkw",
});

const MapComp = ({ lat, lng }) => {
    return (
        <Map
            //style="mapbox://styles/mapbox/streets-v11"
            style="mapbox://styles/saisridhar/ckqz2mkxo1fqv18p3h09exyes"
            zoom={[12]}
            center={[lng, lat]}
            containerStyle={{
                height: "30rem",
                width: "100%",
            }}
        >
            <Layer
                type="symbol"
                id="marker"
                layout={{ "icon-image": "geo-alt-fill" }}
            >
                <Feature coordinates={[lng, lat]} />
            </Layer>
        </Map>
    );
};

export default MapComp;

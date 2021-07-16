import React from "react";

import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_KEY,
});

const MapComp = ({ lat, lng }) => {
    return (
        <Map
            //style="mapbox://styles/mapbox/streets-v11"
            //eslint-disable-next-line
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

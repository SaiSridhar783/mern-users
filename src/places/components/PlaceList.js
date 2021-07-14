import { Text } from "@chakra-ui/react";
import React from "react";
import Button from "../../shared/components/UI/Button/Button";
import Card from "../../shared/components/UI/Card/Card";
import PlaceItem from "./PlaceItem";

import "./PlaceList.css";

const PlaceList = (props) => {
    if (props.items.length === 0) {
        return (
            <div className="place-list center">
                <Card>
                    <Text my={3}>No Places Found. Create one ?</Text>
                    <Button to="/places/new">Share Place</Button>
                </Card>
            </div>
        );
    }

    return (
        <ul className="place-list">
            {props.items.map((place) => (
                <PlaceItem
                    key={place.id}
                    id={place.id}
                    image={place.image}
                    title={place.title}
                    description={place.description}
                    address={place.address}
                    creatorId={place.creator}
                    coordinates={place.location}
                    onDelete={props.onDeletePlace}
                />
            ))}
        </ul>
    );
};

export default PlaceList;

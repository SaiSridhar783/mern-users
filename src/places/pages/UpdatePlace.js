import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Button from "../../shared/components/UI/Button/Button";
import Card from "../../shared/components/UI/Card/Card";
import Input from "../../shared/components/UI/Input/Input";
import useFormState from "../../shared/hooks/useFormState";
import {
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";

const DUMMY_PLACES = [
    {
        id: "u1",
        title: "Sydney Opera House",
        description:
            "Sydney is a large metropolis in Australia, the most populous city and most populous country in the world. The city is the capital and most populous city of Australia, with a population of more than 3 million people and an area of more than 40 square miles (921 km2). The city is the most populous city in the world by population, with more than 7.5 million people living in it. The city is the most populous city in Australia, with a total population of more than 7.5 million people, and the most populous city in the world by population, with more than 7.5 million people living in it.",
        address: "Sydney, New South Wales, Australia",
        imageUrl: "https://bankai-ecommerce.s3.amazonaws.com/media/sample.jpg",

        location: {
            lat: -33.867,
            lng: 151.206,
        },
        creator: "u1",
    },
    {
        id: "u2",
        title: "The Red Rock",
        description:
            "The Red Rock is a large, circular structure located in the heart of the city, and is the largest structure in the city. It is a popular place to visit in the city, and is a popular place to visit in the city, and is a popular place to visit in the city, and is a popular place to visit in the city, and is a popular place to visit in the city, and is a popular place to visit in the city, and is a popular place to visit in the city, and is a popular place to visit in the city, and is a popular place to visit in the city, and is a popular place to visit in the city, and is a popular place to visit in the city, and is a popular place to visit in the city, and is a popular place to visit in the city, and is a popular place to visit in the city, and is a popular place to visit in the city, and is a popular place to visit in the city, and is a popular place to visit in the city, and is a popular place to visit in the city, and is a popular place to visit in the city, and is a popular place to visit in the city, and is a popular place to visit in the city, and is a popular place to visit in the city, and is a popular place to visit in the city, and is a popular place to visit in the city, and is a popular place to visit in the city, and is a popular place to visit in the city, and is a popular place to visit in the city, and is a popular place to visit in the city, and is a popular place to visit in the city, and is a popular place to visit in the city, and is a popular place to visit in the city, and is a popular place to visit in the city, and is a popular place to visit in the city, and is a popular place to visit in the city, and is a popular place to visit in the city, and is a popular place to visit in the city",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Red_Rock_of_Sydney.jpg/1024px-Red_Rock_of_Sydney.jpg",
        address: "Sydney, New South Wales, Australia",
        location: {
            lat: -93.867,
            lng: 11.206,
        },
        creator: "u2",
    },
    {
        id: "u3",
        title: "Sydney Opera House",
        description: "Wka",
        imageUrl:
            "https://bankai-ecommerce.s3.amazonaws.com/media/gorilla.jpeg",
        address: "Taj Mahal, Agra, India",
        location: {
            lng: 78.0421,
            lat: 27.1751,
        },
        creator: "u3",
    },
];

const UpdatePlace = () => {
    const placeId = useParams().placeId;

    const [isLoading, setIsLoading] = useState(true);
    const [formState, inputHandler, setFormData] = useFormState(
        {
            title: {
                value: "",
                isValid: false,
            },
            description: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);

    useEffect(() => {
        if (identifiedPlace) {
            setFormData(
                {
                    title: {
                        value: identifiedPlace.title,
                        isValid: true,
                    },
                    description: {
                        value: identifiedPlace.description,
                        isValid: true,
                    },
                },
                true
            );
        }
        setIsLoading(false);
    }, [identifiedPlace, setFormData]);

    if (!identifiedPlace) {
        return (
            <div className="center">
                <Card>
                    <h2>Place not found</h2>
                </Card>
            </div>
        );
    }

    const placeUpdateSubmitHandler = (e) => {
        e.preventDefault();
        console.log(formState);
    };

    if (isLoading) {
        return (
            <div className="center" role="alert">
                <h2>Loading</h2>
            </div>
        );
    }

    return (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title!"
                onInput={inputHandler}
                value={formState.inputs.title.value}
                valid={formState.inputs.title.isValid}
            />
            <Input
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(10)]}
                errorText="Please enter a valid descripiton (min 10 characters)!"
                onInput={inputHandler}
                value={formState.inputs.description.value}
                valid={formState.inputs.description.isValid}
            />
            <Button type="submit" disabled={!formState.isValid}>
                UPDATE PLACE
            </Button>
        </form>
    );
};

export default UpdatePlace;

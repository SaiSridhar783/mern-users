import { Alert, AlertIcon, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHttpClient } from "../../shared/hooks/useHttp";
import PlaceList from "../components/PlaceList";

const UserPlaces = () => {
    const [loadedPlaces, setLoadedPlaces] = useState();
    const { isLoading, error, sendRequest } = useHttpClient();

    const userId = useParams().userId;

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const response = await sendRequest(
                    `http://localhost:9001/api/places/user/${userId}`
                );
                setLoadedPlaces(response.place);
            } catch (error) {}
        };
        fetchPlaces();
    }, [sendRequest, userId]);

    const placeDeletedHandler = (delId) => {
        setLoadedPlaces((prevPlaces) =>
            prevPlaces.filter((place) => place.id !== delId)
        );
    };

    return (
        <>
            {isLoading ? (
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="red"
                    size="xl"
                    mx="auto"
                    mb="1.1rem"
                    display="block"
                />
            ) : (
                error && (
                    <Alert status="error" my="2rem" maxWidth="38rem" mx="auto">
                        <AlertIcon />
                        {error}
                    </Alert>
                )
            )}
            {loadedPlaces && (
                <PlaceList
                    items={loadedPlaces}
                    onDeletePlace={placeDeletedHandler}
                />
            )}
        </>
    );
};

export default UserPlaces;

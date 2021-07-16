import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import Input from "../../shared/components/UI/Input/Input";
import Button from "../../shared/components/UI/Button/Button";
import Card from "../../shared/components/UI/Card/Card";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import ErrorModal from "../../shared/components/UI/Modal";
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
} from "../../shared/utils/validators";
import useFormState from "../../shared/hooks/useFormState";
import { useHttpClient } from "../../shared/hooks/useHttp";
import { useSelector } from "react-redux";

const UpdatePlace = () => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const auth = useSelector((state) => state.auth.login);
    const { isLoading, error, sendRequest } = useHttpClient();
    const [loadedPlace, setLoadedPlace] = useState();
    const placeId = useParams().placeId;
    const history = useHistory();

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

    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BASE_URL}/places/${placeId}`
                );
                setLoadedPlace(responseData.place);
                setFormData(
                    {
                        title: {
                            value: responseData.place.title,
                            isValid: true,
                        },
                        description: {
                            value: responseData.place.description,
                            isValid: true,
                        },
                    },
                    true
                );
            } catch (err) {
                onOpen();
            }
        };
        fetchPlace();
    }, [sendRequest, placeId, setFormData, onOpen]);

    const placeUpdateSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            await sendRequest(
                `${process.env.REACT_APP_BASE_URL}/places/${placeId}`,
                "PATCH",
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value,
                }),
                {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.token}`,
                }
            );
            history.push("/" + auth.userId + "/places");
        } catch (err) {
            onOpen();
        }
    };

    if (isLoading) {
        return (
            <div className="center">
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="magenta"
                    size="xl"
                    mb="1.1rem"
                />
            </div>
        );
    }

    if (!loadedPlace && !error) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not find place!</h2>
                </Card>
            </div>
        );
    }

    return (
        <React.Fragment>
            <ErrorModal isOpen={isOpen} onClose={onClose} title="FAILED">
                {error}
            </ErrorModal>
            {!isLoading && loadedPlace && (
                <form
                    className="place-form"
                    onSubmit={placeUpdateSubmitHandler}
                >
                    <Input
                        id="title"
                        element="input"
                        type="text"
                        label="Title"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid title."
                        onInput={inputHandler}
                        value={loadedPlace.title}
                        valid={true}
                    />
                    <Input
                        id="description"
                        element="textarea"
                        label="Description"
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText="Please enter a valid description (min. 5 characters)."
                        onInput={inputHandler}
                        value={loadedPlace.description}
                        valid={true}
                    />
                    <Button type="submit" disabled={!formState.isValid}>
                        UPDATE PLACE
                    </Button>
                </form>
            )}
        </React.Fragment>
    );
};

export default UpdatePlace;

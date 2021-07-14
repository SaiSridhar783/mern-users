import React from "react";
import Button from "../../shared/components/UI/Button/Button";

import Input from "../../shared/components/UI/Input/Input";
import useFormState from "../../shared/hooks/useFormState";
import { useHttpClient } from "../../shared/hooks/useHttp";
import {
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Alert, AlertIcon, Spinner } from "@chakra-ui/react";

const NewPlace = () => {
    const { isLoading, error, sendRequest } = useHttpClient();
    const history = useHistory();
    const [formState, inputHandler] = useFormState(
        {
            title: {
                value: "",
                isValid: false,
            },
            description: {
                value: "",
                isValid: false,
            },
            address: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    const uid = useSelector((state) => state.auth.login.user.user.id);
    console.log(uid);

    const placeSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            await sendRequest(
                "http://localhost:9001/api/places",
                "POST",
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value,
                    address: formState.inputs.address.value,
                    creator: uid,
                })
            );
            history.push("/");
        } catch (err) {}
    };

    return (
        <form className="place-form" onSubmit={placeSubmitHandler}>
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title."
                onInput={inputHandler}
            />
            <Input
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description (at least 5 characters)."
                onInput={inputHandler}
            />
            <Input
                id="address"
                element="input"
                type="text"
                label="Address"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid address."
                onInput={inputHandler}
            />
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
                    <Alert status="error" my="2rem">
                        <AlertIcon />
                        {error}
                    </Alert>
                )
            )}
            <Button type="submit" disabled={!formState.isValid}>
                ADD PLACE
            </Button>
        </form>
    );
};

export default NewPlace;

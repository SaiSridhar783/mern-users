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
import ImageUpload from "../../shared/components/UI/ImageUpload/ImageUpload";

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
            image: {
                value: null,
                isValid: false,
            },
        },
        false
    );

    const uid = useSelector((state) => state.auth.login.user.user.id);

    const placeSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            let formData = new FormData();
            formData.append("title", formState.inputs.title.value);
            formData.append("description", formState.inputs.description.value);
            formData.append("address", formState.inputs.address.value);
            formData.append("creator", uid);
            formData.append("image", formState.inputs.image.value);

            await sendRequest(
                "http://localhost:9001/api/places",
                "POST",
                formData
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
                validators={[VALIDATOR_MINLENGTH(10)]}
                errorText="Please enter a valid description (at least 10 characters)."
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
            <ImageUpload
                id="image"
                onInput={inputHandler}
                errorText="Please Provide an image"
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

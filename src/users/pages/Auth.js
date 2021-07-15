import React, { useState } from "react";
import Button from "../../shared/components/UI/Button/Button";
import Card from "../../shared/components/UI/Card/Card";
import Input from "../../shared/components/UI/Input/Input";
import { Alert, AlertIcon, Spinner } from "@chakra-ui/react";

import useFormState from "../../shared/hooks/useFormState";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import { useDispatch, useSelector } from "react-redux";

import "./Auth.css";
import { authActions } from "../../store/authSlice";
import ImageUpload from "../../shared/components/UI/ImageUpload/ImageUpload";

const Auth = (props) => {
    const dispatch = useDispatch();

    const { loading, error, user } = useSelector((state) => state.auth);
    const { loading: logLoading, error: logError } = useSelector(
        (state) => state.auth.login
    );

    const [isLoginMode, setIsLoginMode] = useState(false);
    const [formState, inputHandler, setFormData] = useFormState(
        {
            email: {
                value: "",
                isValid: false,
            },
            password: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    const switchModeHandler = () => {
        if (isLoginMode) {
            setFormData(
                {
                    ...formState.inputs,
                    name: undefined,
                    image: undefined,
                },
                formState.inputs.email.isValid &&
                    formState.inputs.password.isValid
            );
        } else {
            setFormData(
                {
                    ...formState.inputs,
                    name: {
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
        }
        setIsLoginMode((prevMode) => !prevMode);
    };

    const submitFormHandler = async (event) => {
        event.preventDefault();
        if (isLoginMode) {
            const formData = new FormData();
            formData.append("email", formState.inputs.email.value);
            formData.append("password", formState.inputs.password.value);
            formData.append("name", formState.inputs.name.value);
            formData.append("image", formState.inputs.image.value);
            
            dispatch(authActions.authSignup(formData));
            // history.goBack();
        } else {
            dispatch(
                authActions.authLogin({
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value,
                })
            );
        }
    };

    return (
        <Card className="authentication">
            <h2>Authentication Required</h2>
            <hr />
            <form onSubmit={submitFormHandler}>
                {isLoginMode && (
                    <Input
                        id="name"
                        element="input"
                        type="text"
                        label="Your Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a name!"
                        onInput={inputHandler}
                        value={formState.inputs.name.value}
                        valid={formState.inputs.name.isValid}
                    />
                )}
                {isLoginMode && (
                    <ImageUpload center id="image" onInput={inputHandler} />
                )}
                <Input
                    id="email"
                    element="input"
                    type="email"
                    label="Email"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please enter a valid email!"
                    onInput={inputHandler}
                    value={formState.inputs.email.value}
                    valid={formState.inputs.email.isValid}
                />
                <Input
                    id="password"
                    element="input"
                    type="password"
                    label="Password"
                    validators={[VALIDATOR_MINLENGTH(8)]}
                    errorText="Please enter a valid password (min 8 characters)!"
                    onInput={inputHandler}
                    value={formState.inputs.password.value}
                    valid={formState.inputs.password.isValid}
                />
                {user && isLoginMode && (
                    <Alert status="success" my="2rem">
                        <AlertIcon />
                        User created successfully! Continue to Login
                    </Alert>
                )}
                {loading ? (
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
                    error &&
                    isLoginMode && (
                        <Alert status="error" my="2rem">
                            <AlertIcon />
                            {error}
                        </Alert>
                    )
                )}
                {logLoading ? (
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
                    logError &&
                    !isLoginMode && (
                        <Alert status="error" my="2rem">
                            <AlertIcon />
                            {logError}
                        </Alert>
                    )
                )}
                <Button type="submit" disabled={!formState.isValid}>
                    {!isLoginMode ? "Login" : "Create Account"}
                </Button>
            </form>
            <Button
                inverse
                onClick={switchModeHandler}
                style={{ textTransform: "uppercase" }}
            >
                {isLoginMode ? "SIGN IN instead" : "SIGN UP instead"}
            </Button>
        </Card>
    );
};

export default Auth;

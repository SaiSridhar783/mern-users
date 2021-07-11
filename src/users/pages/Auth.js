import React, { useState } from "react";
import Button from "../../shared/components/UI/Button/Button";
import Card from "../../shared/components/UI/Card/Card";
import Input from "../../shared/components/UI/Input/Input";

import useFormState from "../../shared/hooks/useFormState";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";

import "./Auth.css";

const Auth = (props) => {
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
                },
                false
            );
        }
        setIsLoginMode((prevMode) => !prevMode);
    };

    const submitFormHandler = (event) => {
        event.preventDefault();
        console.log(formState);
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

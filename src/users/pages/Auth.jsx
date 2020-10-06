import React, { useContext, useState } from "react";
import Button from "../../shared/components/Button/Button";
import Card from "../../shared/components/Card/Card";
import Input from "../../shared/components/FormElements/Input";
import ImageUpload from "../../shared/components/Image/ImageUpload";
import { AuthContext } from "../../shared/context/auth-context";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpclient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/loading/ErrorModal";
import LoadingSpinner from "../../shared/loading/LoadingSpinner";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./Auth.css";

function Auth() {
  const [loginMode, setLoginMode] = useState(false),
    { isLoading, error, sendRequest, clearError } = useHttpclient(),
    auth = useContext(AuthContext),
    [formState, inputHandler, setFormData] = useForm(
      {
        name: {
          value: "",
          isValid: false,
        },
        image: {
          value: undefined,
          isValid: false,
        },
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
    ),
    submitHandler = async (e) => {
      e.preventDefault();
      console.log(process.env.REACT_APP_BACKEND_URL);

      if (loginMode) {
        try {
          const data = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/users/login`,
            "POST",
            JSON.stringify({
              email: formState.inputs.email.value,
              password: formState.inputs.password.value,
            }),
            {
              "Content-Type": "application/json",
            }
          );
          auth.login(data.user.id);
        } catch (error) {}
      } else {
        try {
          const formData = new FormData();
          formData.append("email", formState.inputs.email.value);
          formData.append("name", formState.inputs.name.value);
          formData.append("password", formState.inputs.password.value);
          formData.append("image", formState.inputs.image.value);

          const data = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
            "POST",
            formData
          );
          auth.login(data.user.id);
        } catch (error) {}
      }
    },
    switchModeHandler = () => {
      if (loginMode) {
        //On Signup Click
        setFormData(
          {
            ...formState.inputs,
            name: {
              value: "",
              isValid: false,
            },
            image: null,
            isValid: false,
          },
          formState.inputs.email.isValid && formState.inputs.password.isValid
        );
      } else {
        setFormData(
          {
            ...formState.inputs,
            name: undefined,
            image: undefined,
          },
          false
        );
      }
      setLoginMode(!loginMode);
    };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login required</h2>
        <hr />
        <form onSubmit={submitHandler}>
          {!loginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name"
              onInput={inputHandler}
            />
          )}
          {!loginMode && (
            <ImageUpload center onInput={inputHandler} id="image" />
          )}
          <Input
            id="email"
            element="input"
            type="email"
            label="E-mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please type a valid Email"
            onInput={inputHandler}
          />
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Place type a valid password, atleast 6 characters."
            onInput={inputHandler}
          />
          <Button
            onClick={submitHandler}
            type="submit"
            disabled={!formState.isValid}
          >
            {loginMode ? "LOGIN" : "SIGN UP"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {loginMode ? "SIGN UP" : "LOGIN"}
        </Button>
      </Card>
    </React.Fragment>
  );
}

export default Auth;

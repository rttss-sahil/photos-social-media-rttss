import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../shared/components/Button/Button";
import Input from "../../shared/components/FormElements/Input";
import ImageUpload from "../../shared/components/Image/ImageUpload";
import { AuthContext } from "../../shared/context/auth-context";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpclient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/loading/ErrorModal";
import LoadingSpinner from "../../shared/loading/LoadingSpinner";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./PlaceForm.css";

function NewPlace() {
  const auth = useContext(AuthContext),
    history = useHistory(),
    { isLoading, error, sendRequest, clearError } = useHttpclient(),
    [formState, inputHandler] = useForm(
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
    ),
    //Submit Handler
    submitHandler = async (e) => {
      e.preventDefault();
      try {
        const formdata = new FormData();
        formdata.append("title", formState.inputs.title.value);
        formdata.append("description", formState.inputs.description.value);
        formdata.append("address", formState.inputs.address.value);
        formdata.append("creator", auth.userId);
        formdata.append("image", formState.inputs.image.value);
        const data = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places`,
          "POST",
          formdata
        );
        return history.push("/");
      } catch (error) {}
    };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <form className="place-form" onSubmit={submitHandler}>
        <Input
          id="title"
          type="text"
          label="Title"
          element="input"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title"
          onInput={inputHandler}
        />
        <Input
          id="address"
          type="text"
          label="Address"
          element="input"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address"
          onInput={inputHandler}
        />
        <ImageUpload center id="image" onInput={inputHandler} />
        <Input
          id="description"
          type="text"
          label="Description"
          element="textarea"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid Description (min. character: 5)"
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </React.Fragment>
  );
}

export default NewPlace;

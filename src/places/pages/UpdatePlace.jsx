import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Button from "../../shared/components/Button/Button";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./PlaceForm.css";
import { useForm } from "../../shared/hooks/form-hook";
import Card from "../../shared/components/Card/Card";
import { useHttpclient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/loading/LoadingSpinner";
import ErrorModal from "../../shared/loading/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";
function UpdatePlace() {
  const placeId = useParams().placeid,
    auth = useContext(AuthContext),
    [loadedData, setLoadedData] = useState(),
    history = useHistory(),
    { isLoading, error, sendRequest, clearError } = useHttpclient(),
    // Custom Hook
    [formState, inputHandler, setFormData] = useForm(
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
    try {
      if (!loadedData) {
        const fetchRequest = async () => {
          const data = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`
          );
          setLoadedData(data.place);
        };
        fetchRequest();
      }
      loadedData &&
        setFormData(
          {
            title: {
              value: loadedData.title,
              isValid: true,
            },
            description: {
              value: loadedData.description,
              isValid: true,
            },
          },
          true
        );
    } catch (error) {}
  }, [loadedData]);
  //
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      history.push(`/${auth.userId}`);
    } catch (error) {}
  };
  //
  if (!loadedData) {
    return (
      <div className="center">
        <Card>
          <h2>Couldn't find any place</h2>
        </Card>
      </div>
    );
  }
  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedData && (
        <form className="place-form" onSubmit={submitHandler}>
          <Input
            id="title"
            type="text"
            label="Title"
            element="input"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title"
            onInput={inputHandler}
            value={loadedData.title}
            valid={true}
          />
          <Input
            id="description"
            type="text"
            label="Description"
            element="textarea"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid Description (min. character: 5)"
            onInput={inputHandler}
            value={loadedData.description}
            valid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </React.Fragment>
  );
}

export default UpdatePlace;

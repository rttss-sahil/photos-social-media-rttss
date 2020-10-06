import React, { useEffect, useReducer } from "react";
import { validate } from "../../util/validators";
import "./Input.css";

const inputReduccer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};
function Input(props) {
  // Reducer
  const [inputState, dispatch] = useReducer(inputReduccer, {
    value: props.value || "",
    isValid: props.valid || false,
    isTouched: false,
  });
  //
  useEffect(() => {
    props.onInput(props.id, inputState.value, inputState.isValid);
  }, [inputState]);
  //Dispatchers
  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };
  const changeHandler = (e) => {
    dispatch({
      type: "CHANGE",
      value: e.target.value,
      validators: props.validators,
    });
  };
  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {props.element === "input" ? (
        <input
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          onChange={changeHandler}
          value={inputState.value}
          onBlur={touchHandler}
        />
      ) : (
        <textarea
          id={props.id}
          rows={props.rows}
          onChange={changeHandler}
          value={inputState.value}
          onBlur={touchHandler}
        />
      )}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
}

export default Input;

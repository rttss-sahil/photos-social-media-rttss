import { useCallback, useReducer } from "react";

//Reducer
const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (let i in state.inputs) {
        if (!state.inputs[i]) {
          continue;
        }
        formIsValid = formIsValid && state.inputs[i].isValid;
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.id]: {
            value: action.value,
            isValid: action.isValid,
          },
        },
        isValid: formIsValid,
      };
    case "SET_DATA":
      return {
        ...state,
        inputs: action.inputs,
        isValid: action.validity,
      };
    default:
      return state;
  }
};

export const useForm = (initialInputs, initialFormValid) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValid,
  });
  //Input Handler
  const inputHandler = useCallback(
    (id, value, isValid) => {
      dispatch({ type: "INPUT_CHANGE", id, value, isValid });
    },
    [dispatch]
  );
  const setFormData = useCallback((inputs, validity) => {
    dispatch({
      type: "SET_DATA",
      inputs,
      validity,
    });
  }, []);

  return [formState, inputHandler, setFormData];
};

import React, { createContext, useContext, useReducer } from "react";

// Define initial state and reducer function
const initialState = {
  user: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case "addRoom":
      return { ...state, user: action.payload  };
    case "removeRoom":
      return { ...state, user: '' };
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Create a custom provider component
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
  );
};

// Create a custom hook for using the context
const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export { AppProvider, useAppContext };

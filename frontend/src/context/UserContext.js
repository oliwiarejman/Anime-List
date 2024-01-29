import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  user: null,
  token: null,
};

const ACTIONS = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

const UserContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        user: action.payload.user,
        token: action.payload.token,
      };
    case ACTIONS.LOGOUT:
      return {
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export { UserProvider, useUserContext, ACTIONS };

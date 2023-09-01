import { useReducer, createContext, useContext } from "react";
import AuthReducer from "./AuthReducer";
import getActions from "./AuthActions";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function AuthContextProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    AuthReducer,
    initialState
  );
  const { login, logout } = getActions(dispatch);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const authContext = useContext(AuthContext);
  return authContext;
}

export { AuthContextProvider, useAuth };

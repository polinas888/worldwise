function AuthReducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, isAuthenticated: false, user: null };
    default:
      throw new Error("Something went wrong with cities data");
  }
}

export default AuthReducer;

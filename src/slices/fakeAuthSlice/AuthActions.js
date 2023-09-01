const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

export function login(email, password, dispatch) {
  if (email === FAKE_USER.email && password === FAKE_USER.password) {
    dispatch({ type: "login", payload: FAKE_USER });
  }
}

export function logout(dispatch) {
  dispatch({ type: "logout" });
}

export default function getActions(dispatch) {
  return {
    login: (email, password) => login(email, password, dispatch),
    logout: () => logout(dispatch),
  };
}

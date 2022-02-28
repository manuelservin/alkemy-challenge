import { authReducer } from "../../../context/auth/AuthReducer";
import { types } from "../../../types/types";

describe("test in authReducer", () => {
  const initialState = { logged: false };
  test("should return the initial state", () => {
    const state = authReducer(initialState, {});

    expect(state).toEqual({ logged: false });
  });
  test("should authenticate the user", () => {
    const action = {
      type: types.login,
      payload: { token: "token" },
    };
    const state = authReducer(initialState, action);
    expect(state).toEqual({ logged: true, token: "token" });
  });
  test("should authenticate the user as guest", () => {
    const action = {
      type: types.loginAsGuest,
      payload: { user: "Guest" },
    };
    const state = authReducer(initialState, action);
    expect(state).toEqual({ logged: true, user: "Guest" });
  });
  test("should logout the user", () => {
    const action = { type: types.logout };
    const state = authReducer(initialState, action);
    expect(state).toEqual({ logged: false });
  });
});

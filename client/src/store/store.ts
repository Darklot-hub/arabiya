import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User } from "../types";
const initial: AuthState = {
  token: localStorage.getItem("arabiya_token"),
  user: null,
  loading: false,
};
const auth = createSlice({
  name: "auth",
  initialState: initial,
  reducers: {
    setLoading(s, a: PayloadAction<boolean>) {
      s.loading = a.payload;
    },
    setAuth(s, a: PayloadAction<{ token: string; user: User }>) {
      s.token = a.payload.token;
      s.user = a.payload.user;
      localStorage.setItem("arabiya_token", a.payload.token);
    },
    setUser(s, a: PayloadAction<User | null>) {
      s.user = a.payload;
    },
    logout(s) {
      s.token = null;
      s.user = null;
      localStorage.removeItem("arabiya_token");
    },
  },
});
export const { setLoading, setAuth, setUser, logout } = auth.actions;
export const store = configureStore({ reducer: { auth: auth.reducer } });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

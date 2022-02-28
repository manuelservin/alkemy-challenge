import { useEffect, useReducer } from "react";
import "./App.css";
import { AuthContext } from "./context/auth/AuthContext";
import { authReducer } from "./context/auth/AuthReducer";
import AppRouter from "./routes/AppRouter";

const init = () => {
  return JSON.parse(sessionStorage.getItem("user")) || { logged: false };
};

function App() {
  const [user, dispatch] = useReducer(authReducer, {}, init);

  useEffect(() => {
    if (!user) return;

    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      <AppRouter />
    </AuthContext.Provider>
  );
}

export default App;

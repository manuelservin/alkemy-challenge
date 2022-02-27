import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { MenuContextProvider } from "../context/menu/MenuContextProvider";
import Login from "../screens/Login";
import MainRoutes from "./MainRoutes";
import PrivateRoutes from "./PrivateRoutes";

import PublicRoutes from "./PublicRoutes";
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          }
        />
        <Route
          path="/*"
          element={
            <MenuContextProvider>
              <PrivateRoutes>
                <MainRoutes />
              </PrivateRoutes>
            </MenuContextProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

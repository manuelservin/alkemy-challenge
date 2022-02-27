import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import { MenuContextProvider } from "../context/menu/MenuContextProvider";
import Details from "../screens/Details";
import Home from "../screens/Home";
import Search from "../screens/Search";

const MainRoutes = () => {
  return (
    <>
      <Navbar />
      <MenuContextProvider>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="search/:id" element={<Details />} />
        </Routes>
      </MenuContextProvider>
    </>
  );
};

export default MainRoutes;

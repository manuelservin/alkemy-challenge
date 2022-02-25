import React, { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

export const MenuContext = createContext([]);

export const MenuContextProvider = ({ children }) => {
  let menu = JSON.parse(localStorage.getItem("menu")) || [];
  const [dishList, setDishList] = useState(menu);

  const addNewDish = (dish) => {
    console.log(dish);
  };

  const deleteDish = (dish) => {
    setDishList(dishList.filter((item) => item.id !== dish.id));

    Swal.fire({
      icon: "success",
      title: `${dish.title} deleted succesfully!`,
    });
  };

  useEffect(() => {
    localStorage.setItem("menu", JSON.stringify(dishList));
  }, [dishList]);

  return (
    <MenuContext.Provider
      value={{
        addNewDish,
        deleteDish,
        dishList,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

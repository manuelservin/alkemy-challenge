import React, { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

export const MenuContext = createContext([]);

export const MenuContextProvider = ({ children }) => {
  let menu = JSON.parse(localStorage.getItem("menu")) || [];
  const [dishList, setDishList] = useState(menu);

  const addNewDish = (dish) => {
    const alreadyExists = dishList.some((item) => item.id === dish.id);

    if (!alreadyExists) {
      if (dishList.length === 4) {
        Swal.fire("Oops!", "Menu is already full", "warning");
        return;
      }
      if (dish.vegan) {
        const vegan = dishList.filter((item) => item.vegan === true);
        if (vegan.length < 2) {
          setDishList([...dishList, dish]);
          Swal.fire({
            icon: "success",
            title: `${dish.title} added succesfully!`,
          });
        } else
          return Swal.fire(
            "Oops!",
            "The maximum number of vegan dishes is 2",
            "warning"
          );
      }

      if (!dish.vegan) {
        const notVegan = dishList.filter((item) => item.vegan === false);
        if (notVegan.length < 2) {
          setDishList([...dishList, dish]);
          Swal.fire({
            icon: "success",
            title: `${dish.title} added succesfully!`,
          });
        } else
          return Swal.fire(
            "Oops!",
            "The maximum number of no vegan dishes is 2",
            "warning"
          );
      }
    } else return Swal.fire("This dish already exists", "info");
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

import React, { useContext } from "react";
import { MenuContext } from "../context/menu/MenuContextProvider";

const DishItem = ({ title, dish }) => {
  const { addNewDish, deleteDish, dishList } = useContext(MenuContext);

  return <div onClick={() => addNewDish(dish)}> {title}</div>;
};

export default DishItem;

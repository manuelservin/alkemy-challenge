import React from "react";
import DishItem from "./DishItem";

const DishList = ({ dishList }) => {
  return (
    <div>
      {dishList &&
        dishList.map((dish) => (
          <DishItem key={dish.id} dish={dish} {...dish} />
        ))}
    </div>
  );
};

export default DishList;

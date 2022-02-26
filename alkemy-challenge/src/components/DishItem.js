import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MenuContext } from "../context/menu/MenuContextProvider";

const DishItem = ({ title, dish }) => {
  const { addNewDish, deleteDish, dishList } = useContext(MenuContext);
  const alreadyExists = dishList.some((item) => item.id === dish.id);

  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <img className="card-img-top" src={dish.image} alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <Link to={`/search/${dish.id}`} className="btn btn-primary">
            Go somewhere
          </Link>
          {alreadyExists ? (
            <button onClick={() => deleteDish(dish)}> Delete</button>
          ) : (
            <button onClick={() => addNewDish(dish)}> Add</button>
          )}
        </div>
      </div>
    </>
  );
};

export default DishItem;

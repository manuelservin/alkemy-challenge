import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MenuContext } from "../context/menu/MenuContextProvider";
import "../styles/dishItem.css";

import { HealthAndSafety } from "@styled-icons/material/HealthAndSafety";
import { Add } from "@styled-icons/fluentui-system-filled/Add";
import { DeleteOutline } from "@styled-icons/material-twotone/DeleteOutline";

const DishItem = ({ title, servings, pricePerServing, dish }) => {
  const { addNewDish, deleteDish, dishList } = useContext(MenuContext);
  const alreadyExists = dishList.some((item) => item.id === dish.id);

  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <Link to={`/search/${dish.id}`} className="clickeable">
          <img className="card-img-top" src={dish.image} alt={title} />

          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <div className="card-info my-3">
              <span className="info-text">
                <HealthAndSafety
                  className={`icon ${
                    dish.healthScore >= 7
                      ? "high"
                      : dish.healthScore >= 4
                      ? "medium"
                      : "low"
                  }`}
                  height={30}
                />

                {dish.healthScore}
              </span>

              <span className="info-text">
                ⏰<span className="ml-1">{dish.readyInMinutes}</span> min.
              </span>
              <span className="info-text">
                🍴
                <span className="ml-1">{dish.servings}</span>
              </span>
            </div>
          </div>
        </Link>

        <div className="card-footer">
          <span> $ {(pricePerServing / servings).toFixed(2)}</span>
          {alreadyExists ? (
            <button className="cta" onClick={() => deleteDish(dish)}>
              <DeleteOutline className="btn__icon" height={20} />
            </button>
          ) : (
            <button className="cta" onClick={() => addNewDish(dish)}>
              <Add className="btn__icon" height={20} />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default DishItem;

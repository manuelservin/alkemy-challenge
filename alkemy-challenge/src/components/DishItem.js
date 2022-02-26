import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MenuContext } from "../context/menu/MenuContextProvider";
import "../styles/dishItem.css";
import { Bowl } from "@styled-icons/entypo/Bowl";
import { ClockAlarm } from "@styled-icons/fluentui-system-filled/ClockAlarm";

import { HealthAndSafety } from "@styled-icons/material/HealthAndSafety";
import { Add } from "@styled-icons/fluentui-system-filled/Add";
import { Delete } from "@styled-icons/material-rounded/Delete";

const DishItem = ({
  title,
  servings,
  readyInMinutes,
  healthScore,
  pricePerServing,
  dish,
}) => {
  const { addNewDish, deleteDish, dishList } = useContext(MenuContext);
  const alreadyExists = dishList.some((item) => item.id === dish.id);

  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <Link to={`/search/${dish.id}`} className="clickeable">
          <img className="card-img-top" src={dish.image} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <div className="card-info my-3">
              <span className="info-text">
                <HealthAndSafety className="icon" height={25} />
                {healthScore}
              </span>

              <span className="info-text">
                <ClockAlarm className="icon" height={25} />
                {readyInMinutes}
              </span>
              <span className="info-text">
                <Bowl className="icon" height={25} />
                {servings}
              </span>
            </div>

            <div className="card-footer">
              <span> $ {(pricePerServing / servings).toFixed(2)}</span>
              {alreadyExists ? (
                <button className="cta" onClick={() => deleteDish(dish)}>
                  <Delete className="btn__icon" height={20} />
                </button>
              ) : (
                <button className="cta" onClick={() => addNewDish(dish)}>
                  <Add className="btn__icon" height={20} />
                </button>
              )}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default DishItem;

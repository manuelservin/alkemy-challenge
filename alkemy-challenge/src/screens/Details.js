import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Carousel } from "react-bootstrap";
import { HealthAndSafety } from "@styled-icons/material/HealthAndSafety";
import { Add } from "@styled-icons/fluentui-system-filled/Add";
import { Delete } from "@styled-icons/material-rounded/Delete";
import { getDishById } from "../helpers/helpers";

import "../styles/Details.css";
import { MenuContext } from "../context/menu/MenuContextProvider";
const Details = () => {
  const { id } = useParams();
  const [dish, setDish] = useState();
  const [loading, setLoading] = useState(false);
  const { addNewDish, deleteDish, dishList } = useContext(MenuContext);
  const alreadyExists = dishList.some((item) => item.id === dish.id);
  useEffect(() => {
    setLoading(true);
    getDishById(id)
      .then((dish) => {
        setDish(dish);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);
  console.log(dish);
  const navigate = useNavigate();
  const handleReturn = () => {
    navigate(-1);
  };

  const { extendedIngredients } = dish && dish;
  console.log(dish.nutrition.nutrients[0].amount);

  return (
    <div className=" container card-detail-container">
      <div className="row mt-5 justify-content-center">
        {loading ? (
          <div class="spinner-border" role="status">
            <span class="visually-hidden"></span>
          </div>
        ) : (
          <div className="col">
            {dish && (
              <div className="card-detail mb-3">
                <div className="row g-0">
                  <div className="col-md-5">
                    <img
                      src={dish.image}
                      className="img-fluid rounded-start"
                      alt="..."
                    />
                  </div>
                  <div className="col-md-7">
                    <div className="card-detail">
                      <h5 className="card-detail-title">{dish.title}</h5>
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
                          🔥
                          <span className="ml-1">
                            {Math.round(dish.nutrition.nutrients[0].amount)}{" "}
                            kcals
                          </span>
                        </span>

                        <span className="info-text">
                          ⏰<span className="ml-1">{dish.readyInMinutes}</span>{" "}
                          min.
                        </span>
                        <span className="info-text">
                          🍴
                          <span className="ml-1">{dish.servings}</span>
                        </span>
                      </div>

                      <div className="card-footer">
                        <span>
                          {" "}
                          $ {(dish.pricePerServing / dish.servings).toFixed(2)}
                        </span>
                        {alreadyExists ? (
                          <button
                            className="btn"
                            onClick={() => deleteDish(dish)}
                          >
                            <Delete className="btn__icon" height={20} />
                            Remove from Menu
                          </button>
                        ) : (
                          <button
                            className="btn"
                            onClick={() => addNewDish(dish)}
                          >
                            <Add className="btn__icon" height={20} />
                            Add to Menu
                          </button>
                        )}
                      </div>

                      <p className="card-detail-text">{dish.diets}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="row justify-content-center m-0  mt-5">
              <button className="btn" onClick={handleReturn}>
                Return
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;

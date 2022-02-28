import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HealthAndSafety } from "@styled-icons/material/HealthAndSafety";
import { Add } from "@styled-icons/fluentui-system-filled/Add";
import { DeleteOutline } from "@styled-icons/material-twotone/DeleteOutline";

import { getDishById } from "../helpers/helpers";

import { MenuContext } from "../context/menu/MenuContextProvider";
import "../styles/Details.css";
const Details = ({ value }) => {
  const { id } = useParams();
  console.log(id);
  const [dish, setDish] = useState();
  const [loading, setLoading] = useState(false);
  const { addNewDish, deleteDish, dishList } = useContext(MenuContext);
  const alreadyExists = dishList.filter((item) => item.id === id);

  useEffect(() => {
    setLoading(true);
    getDishById(id)
      .then((dish) => {
        setLoading(false);
        setDish(dish);
      })
      .catch((error) => console.log(error));
  }, [id]);

  console.log(dish);
  return (
    <div className=" container box">
      {loading ? (
        <div className="loading">
          <div class="spinner-border" role="status">
            <span class="visually-hidden"></span>
          </div>
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
                          {Math.round(dish.nutrition.nutrients[0].amount)} kcals
                        </span>
                      </span>

                      <span className="info-text">
                        ⏰<span className="ml-1">{dish.readyInMinutes}</span>{" "}
                        min.
                      </span>
                    </div>
                  </div>
                  <p className="recipe-tags">
                    {dish.vegan && <span class="recipe-tag">Vegan</span>}
                    {dish.vegetarian && (
                      <span class="recipe-tag">Vegetarian</span>
                    )}
                    {dish.glutenFree && (
                      <span class="recipe-tag">Gluten free</span>
                    )}
                  </p>

                  <div className="ingredients">
                    <h6 className="ingredients__title">Ingredients</h6>
                    <div className="ingredients__items">
                      {dish.extendedIngredients &&
                        dish.extendedIngredients.map((ing) => (
                          <span className="item">{ing.name}</span>
                        ))}
                    </div>
                  </div>

                  <div className="card-footer">
                    <span>
                      {" "}
                      $ {(dish.pricePerServing / dish.servings).toFixed(2)}
                    </span>
                    {alreadyExists.length > 0 ? (
                      <button className="btn" onClick={() => deleteDish(dish)}>
                        <DeleteOutline className="btn__icon" height={20} />
                        Remove from Menu
                      </button>
                    ) : (
                      <button className="btn" onClick={() => addNewDish(dish)}>
                        <Add className="btn__icon" height={20} />
                        Add to Menu
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Details;

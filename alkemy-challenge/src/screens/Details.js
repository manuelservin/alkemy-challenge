import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDishById } from "../helpers/helpers";

const Details = () => {
  const { id } = useParams();
  const [dish, setDish] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getDishById(id)
      .then((dish) => {
        setDish(dish);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      {loading ? (
        <div
          style={{ width: "100%", height: "100%" }}
          className="row justify-content-center mt-5"
        >
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {dish && (
            <div class="card">
              <div class="row g-0">
                <div class="col-5 col-sm-4">
                  <img
                    src={dish.image}
                    class="img-fluid w-100"
                    alt="card-horizontal-image"
                  />
                </div>
                <div class="col-7 col-sm-8">
                  <div class="card-body">
                    <h5 class="card-title">{dish.title}</h5>
                    <p class="card-text">
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content.
                    </p>
                    <p class="card-text">
                      <small class="text-muted">Last updated 3 mins ago</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Details;

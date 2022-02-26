import React, { useContext, useState } from "react";
import DishItem from "../components/DishItem";
import SearchForm from "../components/SearchForm";

const lastSearch = JSON.parse(localStorage.getItem("lastSearch")) || [];

const Search = () => {
  const [dishes, setDishes] = useState(lastSearch);
  const [loading, setLoading] = useState(false);

  return (
    <div className="container ">
      <div className="row justify-content-center m-0">
        <SearchForm setDishes={setDishes} setLoading={setLoading} />
      </div>
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
        <div className="my-5  list ">
          {dishes &&
            dishes.map((dish) => (
              <div className="small" key={dish.id}>
                <DishItem {...dish} dish={dish} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Search;

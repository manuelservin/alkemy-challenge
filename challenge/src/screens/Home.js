import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import DishList from "../components/DishList";
import { MenuContext } from "../context/menu/MenuContextProvider";
import { getAverage, getTotal } from "../helpers/helpers";

import "../styles/Home.css";

const Home = () => {
  const { dishList } = useContext(MenuContext);
  console.log(dishList);

  const [price, setPrice] = useState(0);
  const [healthScore, setHealthScore] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    setPrice(getTotal(dishList, "pricePerServing"));
    if (dishList.length > 0) {
      setTime(getAverage(dishList, "readyInMinutes"));
      setHealthScore(getAverage(dishList, "healthScore"));
    }
  }, [dishList]);

  const handleClick = () => {
    console.log("open");
    Swal.fire({
      title: "<strong> Resume:</strong>",
      icon: "info",
      html: ` <p> <b>Price</b>:  ${price} <p> 
     <p> <b>Ready In
     </b>: ${time} minutes<p> 
     <p> <b>Health Score</b>:  ${healthScore} <p> 
     
     `,
      showCloseButton: true,

      focusConfirm: false,
    });
  };

  return (
    <div className="container">
      {dishList.length === 0 && (
        <div className="row  full mt-5  empty">
          <h2> Your menu is empty</h2>
          <h3>Meet our options </h3>
          <Link to="/search" className="btn__home">
            Explore dishes...
          </Link>
        </div>
      )}

      {dishList && dishList.length !== 0 && (
        <>
          <p className="text-container">
            Your <b>Menu</b> Right Here
          </p>
          <DishList dishList={dishList} />
          <div className=" resume mb-5">
            <button className="cta__resume" onClick={handleClick}>
              Resume
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;

import axios from "axios";
import { config } from "../config/config";
import Swal from "sweetalert2";
export const startLogin = async (data) => {
  try {
    const response = await axios.post(
      "http://challenge-react.alkemy.org/",
      data
    );
    return response.data;
  } catch (error) {
    return Swal.fire("Error", "Email or password invalid", "error");
  }
};

export const searchDish = async (values) => {
  const { dish, vegan } = values;
  if (vegan) {
    const response = await axios
      .get(
        `${config.baseUrl}/recipes/complexSearch?query=${dish}&addRecipeInformation=true&diet=vegan&apiKey=${config.apiKey}`
      )
      .then((res) => {
        return res.data.results;
      })
      .catch((err) => Swal.fire("Error!", err, "error"));
    return response;
  }
  const response = await axios
    .get(
      `${config.baseUrl}/recipes/complexSearch?query=${dish}&addRecipeInformation=true&apiKey=${config.apiKey}`
    )
    .then((res) => {
      return res.data.results;
    })
    .catch((err) => Swal.fire("Error!", err, "error"));

  return response;
};

export const getTotal = (array, value) => {
  if (value === 0) return;

  let total = array.map((v) => v[value]).reduce((a, b) => a + b, 0);
  return total.toFixed(2);
};
export const getAverage = (array, value) => {
  console.log(array);
  console.log(value);
  if (value === "") return;
  let total =
    array.map((v) => v[value]).reduce((prev, curr) => (curr += prev)) /
    array.length;
  console.log(total);
  return total.toFixed();
};

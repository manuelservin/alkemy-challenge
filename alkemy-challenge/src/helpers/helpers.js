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

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

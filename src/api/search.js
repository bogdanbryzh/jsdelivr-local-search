import axios from "axios";
import { NPM_REGISTRY_API } from "./config.js";

const buildSearchURI = ({ query, from = 0, amount = 10 }) => {
  return `${NPM_REGISTRY_API}/-/v1/search?text=${query}&size=${amount}&from=${from}`;
};

export const search = async (params, cancelToken) => {
  return new Promise((resolve, reject) => {
    axios
      .get(buildSearchURI(params), { cancelToken: cancelToken.token })
      .then(data => resolve(data.data))
      .catch(error => reject(error));
  });
};

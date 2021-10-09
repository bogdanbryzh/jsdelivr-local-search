import axios from "axios";
import { JSDELIVR_API } from "./config";

const buildFetchURI = ({ name, version }) => {
  return `${JSDELIVR_API}/package/npm/${name}@${version}`;
};

export const fetch = async (params, cancelToken) => {
  return new Promise((resolve, reject) => {
    axios
      .get(buildFetchURI(params), { cancelToken: cancelToken.token })
      .then(data => resolve(data.data))
      .catch(error => reject(error));
  });
};

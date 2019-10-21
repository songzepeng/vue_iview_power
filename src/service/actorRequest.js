import axios from "axios";

export const getData = params => {
  return axios.get("http://localhost:8888/per/role", { params });
};

export default { getData };

import axios from "axios";

const url = "http://localhost:3000/products"

const getAll = () => {
  const req = axios.get(url);
  return req.then((res) => res.data);
};

export default { getAll }
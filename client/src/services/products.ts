import axios from "axios";

const url = "http://localhost:3000/products";

const getAll = () => {
  const req = axios.get(url);
  return req.then((res) => res.data);
};

const getOne = (id: string) => {
  const req = axios.get(`${url}/${id}`);
  return req.then((res) => res.data);
};

const create = (
  productData: {
    name: string;
    description: string;
    price: number;
  },
  token: string
) => {
  const req = axios.post(url, productData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return req.then((res) => res.data);
};
export default { getAll, create, getOne };

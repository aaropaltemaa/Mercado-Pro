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

const getSellerProducts = (token: string) => {
  const req = axios.get(`${url}/my`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return req.then((res) => res.data);
};

const getByCategory = async (categoryName: string) => {
  const req = await axios.get(`${url}/category/${categoryName}`);
  return req.data;
};

const getReviews = async (productId: string) => {
  const req = await axios.get(`${url}/${productId}/reviews`);
  return req.data;
};

const createReview = async (
  productId: string,
  payload: { rating: number; comment?: string },
  token: string
) => {
  const res = await axios.post(`${url}/${productId}/reviews`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
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

const update = async (
  productId: string,
  data: Partial<{
    name: string;
    description: string;
    price: number;
    image: string;
  }>,
  token: string
) => {
  const req = await axios.put(`${url}/${productId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return req.data;
};

const remove = async (productId: string, token: string) => {
  const req = await axios.delete(`${url}/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return req.data;
};
export default {
  getAll,
  create,
  getOne,
  getSellerProducts,
  update,
  remove,
  getByCategory,
  getReviews,
  createReview,
};

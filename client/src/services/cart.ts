import axios from "axios";

const url = "http://localhost:3000/cart";

const getCart = (token: string) => {
  const req = axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return req.then((res) => res.data);
};

const addCartItem = (productId: string, quantity: number, token: string) => {
  const req = axios.post(
    url,
    { productId, quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return req.then((res) => res.data);
};

const removeCartItem = (itemId: string, token: string) => {
  const req = axios.delete(`${url}/${itemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return req.then((res) => res.data);
};

export default { getCart, addCartItem, removeCartItem };

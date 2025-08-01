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

export default { getCart };

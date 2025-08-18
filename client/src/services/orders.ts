import axios from "axios";
import type { ShippingData } from "../../../types";

const url = `${import.meta.env.VITE_API_URL}/orders`;

const getAll = (token: string) => {
  const req = axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return req.then((res) => res.data);
};

const create = (token: string, shippingData: ShippingData) => {
  const req = axios.post(
    url,
    { shippingData },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return req.then((res) => res.data);
};

export default { create, getAll };

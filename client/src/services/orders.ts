import axios from "axios";
import type { ShippingData } from "../../../types";

const url = "http://localhost:3000/orders";

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

export default { create };

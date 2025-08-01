import axios from "axios";

const url = "http://localhost:3000/orders";

const create = (token: string) => {
  const req = axios.post(
    url,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return req.then((res) => res.data);
};

export default { create };

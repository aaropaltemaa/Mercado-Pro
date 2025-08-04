import axios from "axios";

const baseLoginUrl = "http://localhost:3000/auth/login";
const baseRegisterUrl = "http://localhost:3000/auth/register";

const login = async (credentials: { email: string; password: string }) => {
  const response = await axios.post(baseLoginUrl, credentials);
  return response.data;
};

const register = async (credentials: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post(baseRegisterUrl, credentials);
  return response.data;
};
export default { login, register };

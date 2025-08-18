import axios from "axios";

const baseLoginUrl = `${import.meta.env.VITE_API_URL}/auth/login`;
const baseRegisterUrl = `${import.meta.env.VITE_API_URL}/auth/register`;

const login = async (credentials: { email: string; password: string }) => {
  const response = await axios.post(baseLoginUrl, credentials);
  return response.data;
};

const register = async (credentials: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  const response = await axios.post(baseRegisterUrl, credentials);
  return response.data;
};
export default { login, register };

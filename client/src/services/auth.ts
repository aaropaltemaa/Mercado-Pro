import axios from "axios";

const baseLoginUrl = "http://localhost:3000/auth/login"

const login = async (credentials: { email: string, password: string }) => {
  const response = await axios.post(baseLoginUrl, credentials);
  return response.data;
};
export default { login }
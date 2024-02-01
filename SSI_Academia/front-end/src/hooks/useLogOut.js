import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useLogOut = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
    logoutFromNineNine();

    navigate("/login");
  };

  return { logout };
};

const logoutFromNineNine = async () => {
  try {
    const response = await axios.get("https://localhost:9999/logoutEndPoint");
    console.log(`LogOut ${response.data}`);
  } catch (error) {
    console.error(`Could not log out ${error}`);
  }
};

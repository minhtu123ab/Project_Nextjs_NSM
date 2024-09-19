import axios from "axios";
import Cookies from "js-cookie";

const refreshToken = async () => {
  const token = Cookies.get("token");
  const TokenRefresh = {
    refresh: token,
  };
  try {
    const urlServer = process.env.NEXT_PUBLIC_URL_SERVER_REFRESH_TOKEN;
    const response = await axios.post(
      urlServer + "/refresh-token",
      TokenRefresh
    );
    const token: IToken = response.data;
    localStorage.setItem("token", token.access);
    Cookies.set("token", token.refresh, {
      expires: 30 / 1440,
    });
    return token.access;
  } catch (err) {
    console.log(err);
    window.location.href = "auth/login";
    localStorage.removeItem("token");
    Cookies.remove("token");
    return null;
  }
};

export default refreshToken;

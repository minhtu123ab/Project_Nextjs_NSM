import axios from "axios";

const refreshToken = async () => {
  const token = localStorage.getItem("token") || null;
  const tokenData = token ? JSON.parse(token) : null;

  const TokenRefresh = {
    refresh: tokenData.refresh,
  };
  try {
    const urlServer = process.env.NEXT_PUBLIC_URL_SERVER_REFRESH_TOKEN;
    const response = await axios.post(
      urlServer + "/refresh-token",
      TokenRefresh
    );
    const token: IToken = response.data;
    localStorage.setItem("token", JSON.stringify(token));
    return token.access;
  } catch (err) {
    console.log(err);
    window.location.href = "auth/login";
    localStorage.removeItem("token");
    return null;
  }
};

export default refreshToken;

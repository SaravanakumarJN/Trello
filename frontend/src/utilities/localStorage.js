const getToken = () => {
  let token = JSON.parse(localStorage.getItem("token"));

  return token;
};

const setToken = (token) => {
  let stringified_token = JSON.stringify(token);
  localStorage.setItem("token", stringified_token);
};

const clearToken = () => {
  localStorage.removeItem("token");
};

export { getToken, setToken, clearToken };

const getItem = (key) => {
  let token = JSON.parse(localStorage.getItem(key));
  return token;
};

const setItem = (key, value) => {
  let stringified = JSON.stringify(value);
  localStorage.setItem(key, stringified);
};

const clearItem = (key) => {
  localStorage.removeItem(key);
};

export { getItem, setItem, clearItem };

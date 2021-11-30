import axios from "axios";
import { getToken } from "./localStorage";
let { REACT_APP_BASE_URL: base_url } = process.env;
base_url = base_url || "http://localhost:8000";

const loginUser = (payload) => {
  return axios
    .post(`${base_url}/api/auth/login`, payload)
    .then((res) => res.data);
};

const registerUser = (payload) => {
  return axios
    .post(`${base_url}/api/auth/register`, payload)
    .then((res) => res.data);
};

const getUsersAllBoards = () => {
  let token = getToken("token");

  return axios
    .get(`${base_url}/api/board/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

const getIndividualBoard = (payload) => {
  let token = getToken("token");

  return axios
    .get(`${base_url}/api/board/${payload}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

const addCard = (payload) => {
  let token = getToken("token");

  return axios
    .post(`${base_url}/api/card/create`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

const addList = (payload) => {
  let token = getToken("token");

  return axios
    .post(`${base_url}/api/list/create`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

const editCardNameDes = ({ _id, payload }) => {
  let token = getToken("token");

  return axios
    .patch(`${base_url}/api/card/name_des/${_id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

const editBoardName = (payload) => {
  let token = getToken("token");

  return axios
    .patch(`${base_url}/api/board/`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

const editListName = (payload) => {
  let token = getToken("token");

  return axios
    .patch(`${base_url}/api/list/name`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

export {
  loginUser,
  registerUser,
  getUsersAllBoards,
  getIndividualBoard,
  addList,
  addCard,
  editBoardName,
  editListName,
  editCardNameDes,
};

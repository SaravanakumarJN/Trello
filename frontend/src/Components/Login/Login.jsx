import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";

import styles from "./Login.module.css";
import { loginUser } from "../../utilities/networkRequests";
import { getItem, setItem } from "../../utilities/localStorage";

let initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [form, setForm] = useState(initialState);
  const history = useHistory();
  const [openSnackbar] = useSnackbar({
    position: "top-center",
  });

  useEffect(() => {
    let token = getItem("token");
    if (token !== null && token !== undefined) {
      history.push("/home");
    }
  }, []);

  const handleForm = (e) => {
    let { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser(form)
      .then(({ data }) => {
        let { token, user_details } = data;
        if (token) {
          setItem("token", token);
          setItem("user_details", user_details);
          history.push("/home");
        }
      })
      .catch((error) => {
        if (error.response) {
          openSnackbar(
            error.response.data.message
              ? error.response.data.message
              : error.response.data
          );
        } else {
          openSnackbar(error.message);
        }
      });
  };

  const handleNavigateToRegister = () => {
    history.push("/register");
  };

  const { email, password } = form;
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.form_item}>
          <strong>Email</strong>
          <br />
          <input
            name='email'
            type='email'
            // placeholder='Enter your email'
            value={email}
            required={true}
            onChange={handleForm}
          />
        </div>
        <div className={styles.form_item}>
          <strong>Password</strong>
          <br />
          <input
            name='password'
            type='password'
            // placeholder='Enter your password'
            value={password}
            required={true}
            onChange={handleForm}
          />
        </div>
        <div className={styles.form_item_btn}>
          <input type='submit' value='Login' />
        </div>
      </form>
      <div className={styles.options}>
        Not a user? | <span onClick={handleNavigateToRegister}>Register</span>
      </div>
    </div>
  );
};

export { Login };

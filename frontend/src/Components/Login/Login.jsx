import { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { getItem, setItem } from "../../utilities/localStorage";
import { loginUser } from "../../utilities/networkRequests";
import { useHistory } from "react-router-dom";

let initialState = {
  email: "",
  password: "",
};
const Login = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const history = useHistory();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let { data } = await loginUser(form);
      let { token, user_details } = data;

      if (token) {
        setItem("token", token);
        setItem("user_details", user_details);
        await setError(false);
        await setLoading(false);
        history.push("/home");
        return;
      }

      setError(true);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  const handleNavigateToRegister = () => {
    history.push("/register");
  };

  const { email, password } = form;
  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.alert_indicators}>Loading...</div>
      ) : (
        <>
          {error && (
            <div className={styles.alert_indicators}>
              Opps! Something went wrong
            </div>
          )}
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
            Not a user? <span onClick={handleNavigateToRegister}>Register</span>
          </div>
        </>
      )}
    </div>
  );
};

export { Login };

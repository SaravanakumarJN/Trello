import { useState } from "react";
import { registerUser } from "../../utilities/networkRequests";
import styles from "./Register.module.css";
import { useHistory } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
};
const Register = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const history = useHistory();

  const handleForm = (e) => {
    let { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      let { error } = await registerUser(form);

      if (!error) {
        await setError(false);
        await setLoading(false);
        history.push("/");
        return;
      }

      setError(true);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  const handleNavigateToLogin = () => {
    history.push("/");
  };

  const { name, email, password } = form;
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
              <strong>Name</strong>
              <br />
              <input
                name='name'
                type='text'
                // placeholder='Enter the name'
                value={name}
                onChange={handleForm}
                required={true}
              />
            </div>
            <div className={styles.form_item}>
              <strong>Email</strong>
              <br />
              <input
                name='email'
                type='email'
                // placeholder='Enter the email'
                value={email}
                onChange={handleForm}
                required={true}
              />
            </div>
            <div className={styles.form_item}>
              <strong>Password</strong>
              <br />
              <input
                name='password'
                type='password'
                // placeholder='Enter the password'
                value={password}
                onChange={handleForm}
                required={true}
              />
            </div>
            <div className={styles.form_item_btn}>
              <input type='submit' value='Register' />
            </div>
          </form>
          <div className={styles.options}>
            Already a user? <span onClick={handleNavigateToLogin}>Login</span>
          </div>
        </>
      )}
    </div>
  );
};

export { Register };

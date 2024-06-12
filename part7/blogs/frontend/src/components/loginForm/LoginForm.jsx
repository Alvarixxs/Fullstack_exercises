import { useField } from "../../hooks/index.js";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/userReducer.js";
import { Navigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";

function LoginForm() {
  const { reset: resetUsername, ...username } = useField("text");
  const { reset: resetPassword, ...password } = useField("password");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      dispatch(loginUser(username.value, password.value));
    } catch (error) {
      console.log(error.message);
    }
    resetUsername();
    resetPassword();
  };

  return user ? (
    <Navigate to="/"></Navigate>
  ) : (
    <form onSubmit={handleSubmit}>
      <div>
        <TextField
          {...username}
          label="username"
          data-testid="username"
          name="Username"
        />
      </div>
      <div>
        <TextField
          {...password}
          label="password"
          data-testid="password"
          name="Password"
        />
      </div>
      <Button variant="contained" color="primary" type="submit">
        login
      </Button>
    </form>
  );
}

export default LoginForm;

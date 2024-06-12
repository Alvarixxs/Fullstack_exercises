import Notification from "../notification/Notification.jsx";
import { useDispatch, useSelector } from "react-redux";
import { initializeUser } from "../../store/userReducer.js";
import { useEffect } from "react";
import Menu from "../menu/Menu.jsx";
import { Outlet } from "react-router-dom";
import LoginForm from "../loginForm/LoginForm.jsx";
import { initializeUsers } from "../../store/usersReducer.js";
import { initializeBlogs } from "../../store/blogReducer.js";
import { Container } from "@mui/material";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  return (
    <Container>
      <h2>blogs</h2>
      <Notification></Notification>
      {user ? (
        <div>
          <Menu></Menu>
          <Outlet></Outlet>
        </div>
      ) : (
        <LoginForm></LoginForm>
      )}
    </Container>
  );
};

export default App;

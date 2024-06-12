import { logoutUser } from "../../store/userReducer.js";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Button, Toolbar } from "@mui/material";

function Menu() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="blogs">
          blogs
        </Button>
        <Button color="inherit" component={Link} to="users">
          users
        </Button>
        {user.name} logged-in
        <Button color="inherit" onClick={handleLogout}>
          logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Menu;

import {Outlet} from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Menu from "./components/Menu.jsx";
import Notification from "./components/Notification";

const App = () => {
  return (
    <div>
      <h1>Software anecdotes</h1>
      <Notification></Notification>
      <Menu></Menu>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default App

import { useSelector } from "react-redux";
import { Alert } from "@mui/material";

function Notification() {
  const message = useSelector((state) => state.notification);

  return message ? <Alert>{message}</Alert> : null;
}

export default Notification;

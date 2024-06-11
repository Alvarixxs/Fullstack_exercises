import {useSelector} from "react-redux";

const Notification = () => {
  const message = useSelector((state) => state.notification)

  return (
    message ? (
      <div>{message}</div>
    ) : null
  )
}

export default Notification
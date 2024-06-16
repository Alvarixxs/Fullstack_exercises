import {Pressable, StyleSheet} from "react-native";
import Text from "./Text";
import {Link} from "react-router-native";

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    padding: 20,
  }
})

function AppBarTab({to, text}) {
  return (
    <Pressable>
      <Link to={to}>
        <Text style={styles.text} fontSize="subheading" fontWeight="bold">{text}</Text>
      </Link>
    </Pressable>
  )
}

export default AppBarTab
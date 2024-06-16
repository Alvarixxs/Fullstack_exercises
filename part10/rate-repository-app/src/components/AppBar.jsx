import {View, StyleSheet, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import theme from "../theme";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.secondary,
    display: 'flex',
    flexDirection: 'row',
  },
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab to="/" text="Repositories"/>
        <AppBarTab to="signin" text="Sign in"></AppBarTab>
      </ScrollView>
    </View>
  );
};

export default AppBar;
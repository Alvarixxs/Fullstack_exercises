import {View, StyleSheet, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import theme from "../theme";
import AppBarTab from "./AppBarTab";
import {useApolloClient, useQuery} from "@apollo/client";
import {ME} from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.secondary,
    display: 'flex',
    flexDirection: 'row',
  },
  signoutContainer: {
    display: 'flex',
    flexDirection: 'row',
  }
  // ...
});

const AppBar = () => {
  const {data} = useQuery(ME, { fetchPolicy: 'network-only' })

  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const handleLogout = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab to="/" text="Repositories"/>
        {data?.me ? (
          <View style={styles.signoutContainer}>
            <AppBarTab to="/" text={`Hello, ${data.me.username}`} />
            <AppBarTab onPress={handleLogout} to="/" text="Sign out" />
          </View>
        ) : (
          <AppBarTab to="/signin" text="Sign in" />
          )
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;
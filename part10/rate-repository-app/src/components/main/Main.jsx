import { StyleSheet, View } from 'react-native';

import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';
import SignIn from "./SignIn";
import SingleRepository from "./SingleRepository";
import Review from "./ReviewForm";
import ReviewForm from "./ReviewForm";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.main,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />

      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/:id" element={<SingleRepository />} />
        <Route path="/createReview" element={<ReviewForm />} />
      </Routes>
    </View>
  );
};

export default Main;
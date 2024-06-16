import Text from './Text';
import { useFormik } from 'formik';
import {Pressable, TextInput, View, StyleSheet} from "react-native";
import theme from "../theme";
import * as yup from 'yup';

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#fff",
    padding: 20,
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 5,
    padding: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 10,
  },
  text: {
    color: '#fff',
    alignSelf: 'center',
  },
  inputError: {
    borderColor: theme.colors.error,
  }
})

const initialValues = {
  username: '',
  password: '',
};

const onSubmit = (values) => {
  console.log(values);
  values.username = ''
  values.password = ''
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('username is required'),
  password: yup
    .string()
    .required('password is required'),
});

const SignIn = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, formik.errors.username && styles.inputError]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: theme.colors.error }}>{formik.errors.username}</Text>
      )}
      <TextInput
        secureTextEntry
        style={[styles.input, formik.errors.password && styles.inputError]}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: theme.colors.error}}>{formik.errors.password}</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.text}>Sign in</Text>
      </Pressable>
    </View>
  )
}

export default SignIn;
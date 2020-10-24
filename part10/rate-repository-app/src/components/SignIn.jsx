import React, { useContext } from 'react';
import { Formik } from 'formik';
import { View, StyleSheet, Button } from 'react-native';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import AuthStorageContext from '../contexts/AuthStorageContext';
const validationSchema = yup.object().shape({
  username: yup.mixed().required('Username is required'),
  password: yup.mixed().required('Password is required')
});

const initValues = {
  username: '',
  password: ''
};

const styles = StyleSheet.create({
  formFields: {
    alignItems: 'center'
  },
  field: {
    margin: 5,
    padding: 5,
    height: 50,
    backgroundColor: 'white',
    borderColor: '#24292e',
    borderWidth: 1,
    borderRadius: 2
  },
  button: {
    margin: 3,
    padding: 3
  }
});
export const SignInFormContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => {
        return (
          <View style={styles.formField}>
            <FormikTextInput
              style={styles.field}
              name='username'
              placeholder='username'
            />
            <FormikTextInput
              style={styles.field}
              name='password'
              placeholder='password'
            />
            <View style={styles.button}>
              <Button title='Sign in' onPress={handleSubmit} />
            </View>
          </View>
        );
      }}
    </Formik>
  );
};
const SignIn = () => {
  const { signIn } = useSignIn();

  const onSubmit = async (credentials) => {
    console.log(credentials);
    try {
      await signIn(credentials);
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInFormContainer onSubmit={onSubmit} />;
};

export default SignIn;

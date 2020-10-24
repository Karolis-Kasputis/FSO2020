import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import useSignUp from '../hooks/useSignUp';

const styles = StyleSheet.create({
  formFields: {
    alignItems: 'center'
  },
  field: {
    margin: 5,
    padding: 5,
    height: '2em',
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

const initialValues = {
  username: '',
  password: '',
  repeatPassword: ''
};

const validationSchema = yup.object({
  username: yup.string().required().min(1).max(30),
  password: yup.string().required().min(5).max(50),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), ''], 'Passwords must match')
});

const SignUp = () => {
  const { signUp } = useSignUp();

  const onSubmit = async ({ username, password }) => {
    signUp(username, password);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => {
        return (
          <View>
            <FormikTextInput
              style={styles.field}
              name='username'
              placeholder='username'
            />
            <FormikTextInput
              style={styles.field}
              name='password'
              placeholder='Password'
              secureTextEntry
            />
            <FormikTextInput
              style={styles.field}
              name='repeatPassword'
              placeholder='Repeat password'
              secureTextEntry
            />
            <View style={styles.button}>
              <Button title='Sign up' onPress={handleSubmit} />
            </View>
          </View>
        );
      }}
    </Formik>
  );
};

export default SignUp;

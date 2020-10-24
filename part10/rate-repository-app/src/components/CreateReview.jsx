import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Text from './Text';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useHistory } from 'react-router-native';

const validationSchema = yup.object().shape({
  ownerName: yup.string().required().min(4),
  rating: yup
    .number('Rating must be a number from 0 to 100')
    .integer()
    .positive('Must be a positive integer')
    .required()
    .moreThan(0)
    .lessThan(100),
  text: yup.string().required().min(4),
  repositoryName: yup.string().required().min(4)
});

const styles = StyleSheet.create({
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
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: ''
};

const CreateReview = () => {
  const history = useHistory();
  const [submitReview, { data, loading, error }] = useMutation(CREATE_REVIEW);
  const onSubmit = (values) => {
    submitReview({
      variables: { review: { ...values, rating: Number(values.rating) } }
    });
  };
  if (data) {
    history.push(`/repositories/${data.createReview?.repositoryId}`);
  }
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error.message}</Text>;

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
              name='ownerName'
              placeholder='Repository owner name'
            />
            <FormikTextInput
              style={styles.field}
              name='repositoryName'
              placeholder='Repository name'
            />
            <FormikTextInput
              style={styles.field}
              name='rating'
              placeholder='Rating between 0 and 100'
            />
            <FormikTextInput
              style={[styles.field, { height: '6em' }]}
              name='text'
              placeholder='Review'
              multiline={true}
            />
            <View style={styles.button}>
              <Button onPress={handleSubmit} title='Submit review' />
            </View>
          </View>
        );
      }}
    </Formik>
  );
};

export default CreateReview;

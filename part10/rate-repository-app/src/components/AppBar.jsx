import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Text from './Text';
import Constants from 'expo-constants';
import { Link, withRouter } from 'react-router-native';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { IS_USER_AUTHORIZED } from '../graphql/queries';
import AuthStorageContext from '../contexts/AuthStorageContext';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  text: {
    padding: 15,
    color: 'white'
  }
});

const SignIn = () => (
  <Text fontSize='subheading' style={styles.text}>
    Sign in
  </Text>
);
const Repositories = () => (
  <Text fontSize='subheading' style={styles.text}>
    Repositories
  </Text>
);

const SignOut = () => (
  <Text fontSize='subheading' style={styles.text}>
    Sign out
  </Text>
);

const CreateReview = () => (
  <Text fontSize='subheading' style={styles.text}>
    Create a review
  </Text>
);
const SignUp = () => (
  <Text fontSize='subheading' style={styles.text}>
    Sign up
  </Text>
);

const AppBar = () => {
  const { data } = useQuery(IS_USER_AUTHORIZED);
  const auth = useContext(AuthStorageContext);
  const client = useApolloClient();

  const signOut = async () => {
    await auth.removeAccessToken();
    await client.resetStore();
  };
  return (
    <View style={styles.container}>
      <ScrollView horizontal indicatorStyle='black' persistentScrollbar={true}>
        <Link to='/' component={TouchableOpacity}>
          <Repositories />
        </Link>
        {!data?.authorizedUser ? (
          <View style={styles.container}>
            <Link to='/signin' component={TouchableOpacity}>
              <SignIn />
            </Link>
            <Link to='/signup' component={TouchableOpacity}>
              <SignUp />
            </Link>
          </View>
        ) : (
          <View style={styles.container}>
            <Link to='/createreview' component={TouchableOpacity}>
              <CreateReview />
            </Link>
            <TouchableOpacity onPress={signOut}>
              <SignOut />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default withRouter(AppBar);

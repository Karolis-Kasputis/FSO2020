import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import AppBar from './AppBar';
import { Route, Switch, Redirect, Link } from 'react-router-native';
import RepositorySingle from './RepositorySingle';
import CreateReview from './CreateReview';
import SignUp from './SignUp';
import { useHistory } from 'react-router-native';
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8'
  }
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />

      <Switch>
        <Route exact path='/'>
          <RepositoryList />
        </Route>
        <Route exact path='/signup'>
          <SignUp />
        </Route>
        <Route exact path='/signin'>
          <SignIn />
        </Route>
        <Route path='/repositories/:id'>
          <RepositorySingle />
        </Route>
        <Route path='/createreview'>
          <CreateReview />
        </Route>
        <Redirect to='/' />
      </Switch>
    </View>
  );
};

export default Main;

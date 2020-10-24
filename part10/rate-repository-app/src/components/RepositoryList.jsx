import React, { useState, useEffect } from 'react';
import useRepositories from '../hooks/useRepositories';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import RepositoryHeader from './RepositoryItem';
import { withRouter } from 'react-router-native';
import Select from 'react-native-picker-select';
const styles = StyleSheet.create({
  separator: {
    height: 5
  }
});

const ItemSeparator = () => <View style={styles.separator}></View>;

const ClickableRepositoryItem = withRouter(({ history, ...props }) => {
  const onPress = () => {
    history.push(`/repositories/${props.item.id}`);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <RepositoryHeader {...props} />
    </TouchableOpacity>
  );
});

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  return (
    <View>
      <Select
        onValueChange={(value) => console.log(value)}
        items={[
          { label: 'Football', value: 'football' },
          { label: 'Baseball', value: 'baseball' },
          { label: 'Hockey', value: 'hockey' }
        ]}
        placeholder={{ label: 'Order by...' }}
      />
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={ClickableRepositoryItem}
      />
    </View>
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();
  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;

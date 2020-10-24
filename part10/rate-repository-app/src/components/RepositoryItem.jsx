import React from 'react';
import { View, StyleSheet, Image, Button } from 'react-native';
import Text from './Text';
import StatsItem from './StatsItem';
import theme from '../theme';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import * as WebBrowser from 'expo-web-browser';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 5,
    margin: 2,
    padding: 5
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 5
  },
  itemContent: {
    alignItems: 'flex-start',
    margin: 5,
    flexShrink: 1
  },
  statistics: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  language: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    color: 'white',
    padding: 3
  },
  button: {
    marginTop: 10
  }
});

const RepositoryHeader = ({ item }) => {
  const { id } = useParams();

  const openLinkBrowser = () => {
    WebBrowser.openBrowserAsync(item.url);
  };

  return (
    <View testID='repositoryItem' style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <Image style={[styles.image]} source={{ uri: item.ownerAvatarUrl }} />
        <View testID='itemContent' style={styles.itemContent}>
          <Text fontSize='subheading' fontWeight='bold'>
            {item.fullName}
          </Text>
          <Text color='textSecondary'>{item.description}</Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>
      <View testID='itemStats' style={styles.statistics}>
        <StatsItem amount={item.stargazersCount} description='Stars' />
        <StatsItem amount={item.forksCount} description='Forks' />
        <StatsItem amount={item.reviewCount} description='Reviews' />
        <StatsItem amount={item.ratingAverage} description='Rating' />
      </View>
      {id ? (
        <View>
          <View style={styles.button}>
            <Button title='Open in GitHub' onPress={openLinkBrowser} />
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default RepositoryHeader;

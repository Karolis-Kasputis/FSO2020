import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryHeader from './RepositoryItem';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import Text from './Text';
import theme from '../theme';
import moment from 'moment';

const styles = StyleSheet.create({
  reviewContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    margin: 2,
    padding: 5,
    flexDirection: 'row'
  },
  rating: {
    flex: 1,
    alignItems: 'center'
  },
  ratingCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: theme.colors.primary,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentContainer: {
    flex: 5,
    padding: 3
  }
});

const RepositoryReview = ({
  review: {
    text,
    rating,
    createdAt,
    user: { username }
  }
}) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.rating}>
        <View style={styles.ratingCircle}>
          <Text color='primary' fontSize='subheading' fontWeight='bold'>
            {rating}
          </Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <Text fontSize='subheading' fontWeight='bold'>
          {username}
        </Text>
        <Text color='textSecondary'>
          {moment(createdAt).format('DD.MM.YYYY')}
        </Text>
        <Text>{text}</Text>
      </View>
    </View>
  );
};

const RepositorySingle = () => {
  const { id } = useParams();
  const { repository, loading } = useRepository(id);
  console.log('repo', repository);
  if (loading) return <Text>Loading...</Text>;
  const reviews = repository.reviews.edges.map((edge) => edge.node);
  return (
    <FlatList
      data={reviews}
      ListHeaderComponent={() => <RepositoryHeader item={repository} />}
      renderItem={({ item }) => <RepositoryReview review={item} />}
    />
  );
};

export default RepositorySingle;

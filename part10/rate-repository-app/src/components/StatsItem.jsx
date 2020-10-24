import React from 'react';
import Text from './Text';
import { View } from 'react-native';

const formatAmount = (amount) => {
  return amount > 999 ? (amount / 1000).toFixed(1) + 'k' : amount;
};

const StatsItem = ({ amount, description }) => {
  return (
    <View testID='stat' style={{ alignItems: 'center' }}>
      <Text fontWeight='bold'>{formatAmount(amount)}</Text>
      <Text color='textSecondary'>{description}</Text>
    </View>
  );
};

export default StatsItem;

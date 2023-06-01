import React, {FC} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {UserCard} from '../../molecules/userCard';
import {useAppSelector} from '../../../reduxStore/hooks';
import {shallowEqual} from 'react-redux';
import {screenDimension} from '../../../utils/dimensionUtils';

export const UserCardList: FC<any> = () => {
  let userIds = useAppSelector(state => {
    const userKeys = Object.keys(state.homeReducer.users);

    return userKeys;
  }, shallowEqual);

  const renderUserInfo = ({item}: {item: string}) => {
    return <UserCard userId={item} />;
  };

  const getKeyForExtractor = (item: string, index: number) =>
    `${item || index}`;

  return (
    <View style={styles.userList}>
      <FlatList
        data={userIds}
        renderItem={renderUserInfo}
        keyExtractor={getKeyForExtractor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  userList: {
    height: screenDimension.height / 1.5,
  },
});

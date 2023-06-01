import React, {FC} from 'react';
import {IUserInfo} from '../../../reduxStore/reducers/homeReducer/interfaces';
import {FlatList, StyleSheet, View} from 'react-native';
import {UserCard} from '../../molecules/userCard';
import {useAppSelector} from '../../../reduxStore/hooks';
import {shallowEqual} from 'react-redux';
import {screenDimension} from '../../../utils/dimensionUtils';

export const UserCardList: FC<any> = () => {
  const users: IUserInfo[] = useAppSelector(state => {
    const usersData = Object.values(state.homeReducer.users);

    return usersData;
  }, shallowEqual);

  const renderUserInfo = ({item}: {item: IUserInfo}) => {
    return <UserCard userId={item.id as string} />;
  };

  const getKeyForExtractor = (item: IUserInfo, index: number) =>
    `${item.id || index}`;

  return (
    <View style={styles.userList}>
      <FlatList
        data={users}
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

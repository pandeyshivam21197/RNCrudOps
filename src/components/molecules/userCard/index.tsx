import React, {FC} from 'react';
import Text from '../../atoms/text';
import {IUserInfo} from '../../../reduxStore/reducers/homeReducer/interfaces';
import {useAppDispatch, useAppSelector} from '../../../reduxStore/hooks';
import {shallowEqual} from 'react-redux';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {updateUserDetails} from '../../../reduxStore/reducers/homeReducer';

interface IUserCard {
  userId: number;
}

export const UserCard: FC<IUserCard> = ({userId}): React.ReactElement => {
  const dispatch = useAppDispatch();

  const userInfo: IUserInfo = useAppSelector(state => {
    const users = state.homeReducer.users;

    const selectedUser = users[userId];
    return selectedUser;
  }, shallowEqual);

  const {name = '', surname = '', gender = '', info = ''} = userInfo;

  const onCard = () => {
    dispatch(updateUserDetails(userInfo));
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onCard}>
      <Text>{`name: ${name}`}</Text>
      <Text>{`surname: ${surname}`}</Text>
      <Text>{`gender: ${gender}`}</Text>
      <Text>{`info: ${info}`}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

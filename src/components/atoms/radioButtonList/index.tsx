import React, {FC} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import Text from '../text';

export interface IRadioButton {
  key: string;
  value: string;
  isSelected: boolean;
}

interface IRadioButtonList {
  radioButtons: IRadioButton[];
  onButton: (selectedButton: IRadioButton) => void;
}

export const RadioButtonList: FC<IRadioButtonList> = ({
  radioButtons,
  onButton,
}) => {
  const renderItem = ({item}: {item: IRadioButton}) => {
    const {isSelected, value} = item;

    const onRadioButton = () => {
      onButton(item);
    };

    return (
      <TouchableOpacity
        style={styles.radioButtonContainer}
        onPress={onRadioButton}>
        <View
          style={[styles.radioButton, isSelected ? styles.selectedButton : {}]}
        />
        <Text>{value}</Text>
      </TouchableOpacity>
    );
  };

  return <FlatList data={radioButtons} renderItem={renderItem} horizontal />;
};

const styles = StyleSheet.create({
  radioButton: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
  },
  selectedButton: {
    backgroundColor: 'red',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

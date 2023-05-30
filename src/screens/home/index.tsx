import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Home: FC<any> = (): React.ReactElement => {
  return (
    <View style={styles.container}>
      <Text>{'Home Screen'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const home = React.memo(Home);
export {home as Home};

import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageKey from '../constants/AsyncStorageKey';
import {useTaskContext} from '../context/AppContextReducer';
import ScreenName from '../constants/ScreenName';

const SplashScreen = () => {
  const navigation = useNavigation();
  // const [_, dispatch] = useTaskContext();

  async function checkOnboardingComplete() {
    const onboardingComplete = await AsyncStorage.getItem(
      AsyncStorageKey.onboardingComplete,
    );

    const tasks = await AsyncStorage.getItem(AsyncStorageKey.tasks);

    // dispatch({type: 'FETCH_TASK', payload: JSON.parse(tasks)});

    //!
    navigation.replace(ScreenName.taskList);
    // if (onboardingComplete === 'true') {
    //   navigation.replace(ScreenName.taskList);
    // } else {
    //   navigation.replace(ScreenName.onboarding);
    // }
  }
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/animations/todo.json')}
        autoPlay
        loop={false}
        style={{flex: 1}}
        onAnimationFinish={() => {
          setTimeout(() => {
            checkOnboardingComplete();
          }, 1000);
        }}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: colors.background.primary,
  },
});

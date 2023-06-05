import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import React from 'react';
import Config from 'react-native-config';

import {Image, View} from 'react-native';
import {Text} from 'react-native-paper';

import styles from './styles';
import breadIcon from '../../assets/bread-icon-transparent.png';

const SignIn = ({navigation}) => {
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/spreadsheets'], // what API you want to access on behalf of the user, default is email and profile
    androidClientId: Config.GOOGLE_OAUTH_ANDROID_CLIENT_ID,
  });

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();

      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
      console.log(error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    // TODO: display some sort of error message if login fails
    <View style={styles.view}>
      <Image source={breadIcon} style={styles.icon} />
      <Text variant="titleLarge" style={styles.title}>
        Daveloza Inventory Tracker
      </Text>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />
    </View>
  );
};

export default SignIn;

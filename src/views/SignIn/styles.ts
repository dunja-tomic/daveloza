import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 50,
    height: '100%',
    backgroundColor: 'rgb(187, 217, 236)',
  },
  icon: {
    width: 150,
    height: 150,
  },
  title: {
    textAlign: 'center',
    color: 'white',
  },
});

export default styles;

import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    marginTop: 15,
    justifyContent: 'space-between',
  },
  productsView: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  buttonsView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: '40%',
  },
});

export default styles;

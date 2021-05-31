import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

const mediaQuery = () => {
  if (deviceWidth <= 320) {
    return 'xs';
  } if (deviceWidth > 320 && deviceWidth < 428) {
    return 'md';
  } if (deviceWidth >= 428) {
    return 'lg';
  } return null;
};

export default mediaQuery;

import * as Permissions from 'expo-permissions';

function locateCurrentPosition() {
  return getPermission();
}

const getPermission = async () => {
  const { status } = await Permissions.getAsync(Permissions.LOCATION);

  if (status !== 'granted') {
    // eslint-disable-next-line no-unused-vars
    const response = await Permissions.askAsync(Permissions.LOCATION);
  }

  return getCurrentPosition();
};

const getCurrentPosition = () => new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const currentRegion = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.015, // Sets the zoom level for X axis
        longitudeDelta: 0.015, // Sets the zoom level for Y axis
      };
      return resolve(currentRegion);
    },
    (error) => reject(error.message),
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
  );
});

export default locateCurrentPosition;

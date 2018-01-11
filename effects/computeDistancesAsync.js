import {
  Platform,
} from 'react-native';
import {
  Location,
  Permissions,
} from 'expo';
import geolib from 'geolib';

import Actions from '../state/Actions';

export default async function computeDistancesAsync({dispatch, getState}) {
  let { stadiums } = getState();
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') { return; }

  let { coords } = await Location.getCurrentPositionAsync({
    enableHighAccuracy: Platform.OS === 'ios',
  });

  let stadiumsWithDistances = stadiums.all.map(stadium => {
    let distanceM = geolib.getDistance(
      {latitude: coords.latitude, longitude: coords.longitude},
      {latitude: stadium.latitude, longitude: stadium.longitude},
    );

    let distanceKm = (distanceM / 1000.0).toFixed(2);
    let formattedDistance = `${distanceKm}km`;

    let direction = geolib.getCompassDirection(
      {latitude: coords.latitude, longitude: coords.longitude},
      {latitude: stadium.latitude, longitude: stadium.longitude},
    );

    return stadium.
      set('distance', formattedDistance).
      set('direction', direction);
  });


  let nearbyStadiums = stadiumsWithDistances.
    sortBy(stadium => stadium.distance).
    map(stadium => stadium.id);

  dispatch(Actions.setStadiums(stadiumsWithDistances));
  dispatch(Actions.setNearbyStadiums(nearbyStadiums));
}

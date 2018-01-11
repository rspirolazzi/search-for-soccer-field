import LocalStorage from '../state/LocalStorage';

export default function updateVisitedCacheAsync({getState}) {
  let { stadiums } = getState();
  let { visited } = stadiums;

  LocalStorage.saveVisitedStadiumsAsync(visited.toJS());
}

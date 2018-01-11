import { AsyncStorage } from 'react-native';

const Keys = {
  User: 'User',
  VisitedStadiums: 'Visited',
};

async function getUserAsync() {
  let results = await AsyncStorage.getItem(Keys.User);

  try {
    return JSON.parse(results);
  } catch(e) {
    return null;
  }
}

function saveUserAsync(user) {
  return AsyncStorage.setItem(Keys.User, JSON.stringify(user));
}

function removeUserAsync() {
  return AsyncStorage.removeItem(Keys.User);
}

function saveVisitedStadiumsAsync(stadiumIds) {
  return AsyncStorage.setItem(Keys.VisitedStadiums, JSON.stringify(stadiumIds));
}

async function getVisitedStadiumsAsync() {
  let results = await AsyncStorage.getItem(Keys.VisitedStadiums);

  try {
    return JSON.parse(results);
  } catch(e) {
    return null;
  }
}

function clearAllAsync() {
  return AsyncStorage.clear();
}

export default {
  saveUserAsync,
  getUserAsync,
  removeUserAsync,
  saveVisitedStadiumsAsync,
  getVisitedStadiumsAsync,
  clearAllAsync,
};

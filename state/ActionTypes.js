export default defineActionConstants([
  'SET_CURRENT_USER',
  'SIGN_IN',
  'SIGN_OUT',
  'SET_STADIUMS',
  'COMPUTE_DISTANCES',
  'SET_NEARBY_STADIUMS',
  'SET_VISITED_STADIUMS',
  'ADD_VISITED_STADIUM',
  'REMOVE_VISITED_STADIUM',
  'TOGGLE_VISITED_STADIUM',
]);

function defineActionConstants(names) {
  return names.reduce((result, name) => {
    result[name] = name;
    return result;
  }, {});
}

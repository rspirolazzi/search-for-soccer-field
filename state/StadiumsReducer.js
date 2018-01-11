import ActionTypes from './ActionTypes';
import { StadiumsState, Stadium } from './Records';

class StadiumsReducer {
  static reduce(state = new StadiumsState(), action) {
    if (StadiumsReducer[action.type]) {
      return StadiumsReducer[action.type](state, action);
    } else {
      return state;
    }
  }

  static [ActionTypes.SET_STADIUMS](state, action) {
    let stadiums = action.stadiums.sortBy(stadium => stadium.name);
    return state.set('all', stadiums);
  }

  static [ActionTypes.SET_NEARBY_STADIUMS](state, action) {
    return state.set('nearby', action.stadiumIds);
  }

  static [ActionTypes.SET_VISITED_STADIUMS](state, action) {
    return state.set('visited', action.stadiumIds);
  }

  static [ActionTypes.ADD_VISITED_STADIUM](state, action) {
    let visited = state.visited.push(action.stadiumId);
    return state.set('visited', visited);
  }

  static [ActionTypes.REMOVE_VISITED_STADIUM](state, action) {
    let index = state.visited.indexOf(action.stadiumId);

    if (index === -1) {
      return state;
    }

    return state.set('visited', state.visited.delete(index));
  }
}

export default StadiumsReducer.reduce;

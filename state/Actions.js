import ActionTypes from './ActionTypes';

export default class Actions {
  static setCurrentUser(user) {
    return {
      type: ActionTypes.SET_CURRENT_USER,
      user,
    }
  }

  static signIn(user) {
    return {
      type: ActionTypes.SIGN_IN,
      user,
    }
  }

  static signOut() {
    return {
      type: ActionTypes.SIGN_OUT,
    }
  }

  static setStadiums(stadiums) {
    return {
      type: ActionTypes.SET_STADIUMS,
      stadiums,
    }
  }

  static setNearbyStadiums(stadiumIds) {
    return {
      type: ActionTypes.SET_NEARBY_STADIUMS,
      stadiumIds,
    }
  }

  static setVisitedStadiums(stadiumIds) {
    return {
      type: ActionTypes.SET_VISITED_STADIUMS,
      stadiumIds,
    }
  }

  static toggleVisitedStadium(stadiumId) {
    return {
      type: ActionTypes.TOGGLE_VISITED_STADIUM,
      stadiumId,
    }
  }

  static addVisitedStadium(stadiumId) {
    return {
      type: ActionTypes.ADD_VISITED_STADIUM,
      stadiumId,
    }
  }

  static removeVisitedStadium(stadiumId) {
    return {
      type: ActionTypes.REMOVE_VISITED_STADIUM,
      stadiumId,
    }
  }

  static computeDistances() {
    return {
      type: ActionTypes.COMPUTE_DISTANCES,
    }
  }
}

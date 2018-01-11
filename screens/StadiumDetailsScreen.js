import React from 'react';
import {
    connect,
} from 'react-redux';

import Actions from '../state/Actions';
import StadiumDetails from '../components/StadiumDetails';

@connect((data, props) => StadiumDetailsScreen.getDataProps(data, props))
export default class StadiumDetailsScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    }
  }

  static getDataProps(data, props) {
    let stadiumId = props.navigation.state.params.stadiumId;
    let stadium = data.stadiums.all.find(stadium => stadium._id === stadiumId);

    return {
      stadium,
    };
  }

  render() {
    return (
        <StadiumDetails
            stadium={this.props.stadium}
            isVisited={this.props.isVisited}
            onToggleVisited={this._onToggleVisited}
        />
    );
  }
}

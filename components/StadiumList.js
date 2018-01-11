import React from 'react';
import {
    ActivityIndicator,
    Animated,
    FlatList,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    View,
Text,
} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';

import StadiumListItem from './StadiumListItem';

function StadiumsFromIds(all, ids) {
    return ids.map(id => all.find(stadium => stadium._id === id));
}

@withNavigation
@connect((data, props) => StadiumList.getDataProps(data, props))
export default class StadiumList extends React.Component {
    static getDataProps(data, props) {
        let {stadiums} = data;
        let {all, nearby, visited} = stadiums;

        console.log('StadiumList->visited', visited)

        if (props.nearby) {
            stadiums = StadiumsFromIds(all, nearby);
        } else if (props.visited) {
            stadiums = StadiumsFromIds(all, visited);
        } else if (props.notVisited) {
            let allStadiumIds = all.map(stadium => stadium._id);
            let notVisited = allStadiumIds.filter(id => !visited.includes(id));
            stadiums = StadiumsFromIds(all, notVisited);
        } else {
            stadiums = all;
        }

        return {
            stadiums,
        };
    }

    state = {
        renderContents: false,
    };

    componentDidMount() {
        this.props.setRef && this.props.setRef(this);
        setTimeout(() => {
            this.setState({renderContents: true});
        }, 100);
    }

    componentDidUpdate() {
        this.props.setRef && this.props.setRef(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.stadiums !== this.props.stadiums ||
            nextState.renderContents !== this.state.renderContents
        );
    }

    scrollTo(opts) {
        this._scrollView._component.scrollTo(opts);
    }

    render() {
        return (
            <View onLayout={this.props.onLayout} style={styles.container}>
                {this.state.renderContents ? (
                    <FlatList
                        ref={view => {this._scrollView = view;}}
                        contentContainerStyle={this.props.contentContainerStyle}
                        renderItem={this._renderItem}
                        style={styles.container}
                        data={this.props.stadiums.toJS()}
                        keyExtractor={item => item.code}
                    />
                ) : (
                    <View
                        style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              height: 75,
            }}>
                        <ActivityIndicator />
                    </View>
                )}

                <StatusBar barStyle="default"/>
            </View>
        );
    }

    _renderItem = ({item}) => {
        return (
            <StadiumListItem
                onPress={() => this._handlePressStadium(item)}
                stadium={item}
            />
        );
    }

    _handlePressStadium = stadium => {
        this.props.navigation.navigate('details', {stadiumId: stadium._id});
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBFBFB',
    },
});

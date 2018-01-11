import React from 'react';
import {
    Animated,
    Image,
    Linking,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {Constants, LinearGradient} from 'expo';
import TouchableNativeFeedback from '@expo/react-native-touchable-native-feedback-safe';
import {withNavigation, HeaderBackButton} from 'react-navigation';

import {BoldText, RegularText} from './StyledText';
import {
    MapCard,
    DescriptionCard,
    SummaryCard,
    InstagramPhotosCard,
    VisitedCard,
} from './DetailCards';
import formatTime from '../util/formatTime';
import Layout from '../constants/Layout';
import {dummyName} from '../util/dummyImage'

@withNavigation
export default class StadiumDetails extends React.Component {
    state = {
        scrollY: new Animated.Value(0),
    };

    render() {
        let {stadium} = this.props;
        let {scrollY} = this.state;

        return (
            <View style={styles.container}>
                <View style={{ flex: 1, marginTop: -50 }}>
                    {this._renderHeroHeader()}
                    <Animated.ScrollView
                        scrollEventThrottle={16}
                        style={StyleSheet.absoluteFill}
                        onScroll={Animated.event(
                          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                          { useNativeDriver: true }
                        )}>
                        <View style={styles.heroSpacer}/>
                        <View style={styles.contentContainerStyle}>
                            <MapCard
                                stadium={stadium}
                                onPress={this._handlePressDirections}
                            />
                            <SummaryCard text={stadium.name}/>
                            <DescriptionCard text={stadium.name}/>
                            <InstagramPhotosCard profile={stadium.images}/>
                            <VisitedCard stadiumId={this.props.stadium._id}/>
                        </View>
                    </Animated.ScrollView>
                </View>
                {this._renderNavigationBar()}
                <StatusBar barStyle={getBarStyle(stadium.color)}/>
            </View>
        );
    }

    _renderHeroHeader() {
        let {stadium} = this.props;
        let {scrollY} = this.state;

        let logoScale = scrollY.interpolate({
            inputRange: [-150, 0, 150],
            outputRange: [1.5, 1, 1],
        });

        let logoTranslateY = scrollY.interpolate({
            inputRange: [-150, 0, 150],
            outputRange: [40, 0, -40],
        });

        let logoOpacity = scrollY.interpolate({
            inputRange: [-150, 0, 200, 400],
            outputRange: [1, 1, 0.2, 0.2],
        });

        let heroBackgroundTranslateY = scrollY.interpolate({
            inputRange: [-1, 0, 200, 201],
            outputRange: [0, 0, -400, -400],
        });

        let gradientTranslateY = scrollY.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [1, 0, -1],
        });
        const logo = dummyName(stadium.name, styles.heroImage)
        return (
            <View>
                <View style={styles.hero}>
                    <Image
                        resizeMode="contain"
                        source={{ uri: logo}}
                        style={styles.heroImage}
                    />
                </View>
            </View>
        );
    }

    _renderNavigationBar() {
        let { color, accentColor } = this.props.stadium;

        let { scrollY } = this.state;

        return (
            <Animated.View style={[styles.navigationBar, { backgroundColor: color }]}>
                <View style={[styles.navigationBarAction, { marginLeft: -5 }]}>
                    <HeaderBackButton
                        onPress={() => this.props.navigation.goBack()}
                        tintColor={accentColor}
                        title={null}
                    />
                </View>

                <View style={styles.navigationBarTitle}>
                    {this._renderNavigationBarTitle()}
                </View>

                <View style={styles.navigationBarAction}>
                    <TouchableNativeFeedback onPress={this._handlePressDirections}>
                        <MaterialIcons name="directions" size={25} color={accentColor} />
                    </TouchableNativeFeedback>
                </View>
            </Animated.View>
        );
    }

    // Unfortunately we can't animate shadowOpacity right now with native
    // animations, because the prop isn't whitelisted. So we can use
    // LinearGradient instead
    _renderNavigationBarShadow() {
        let {scrollY} = this.state;

        let opacity = scrollY.interpolate({
            inputRange: [0, 50, 300, 301],
            outputRange: [0, 0, 1, 1],
        });

        return (
            <Animated.View style={[styles.navigationBarShadowContainer, { opacity }]}>
                <LinearGradient
                    colors={['rgba(0,0,0,0.08)', 'transparent']}
                    style={styles.navigationBarShadow}
                />
            </Animated.View>
        );
    }

    _renderNavigationBarTitle() {
        let {
            accentColor,
            closingTimeToday,
            isOpen,
            isOpeningLater,
            name,
            openingTimeToday,
        } = this.props.stadium;

        let {scrollY} = this.state;

        let titleOpacity = scrollY.interpolate({
            inputRange: [-1, 0, 150, 300, 301],
            outputRange: [0, 0, 0.1, 1, 1],
        });

        let titleTranslateY = scrollY.interpolate({
            inputRange: [-1, 0, 300, 301],
            outputRange: [0, 0, 3, 3],
        });

        let subtitleScale = scrollY.interpolate({
            inputRange: [-1, 0, 300, 301],
            outputRange: [1, 1, 0.75, 0.75],
        });

        let subtitleTranslateY = scrollY.interpolate({
            inputRange: [-1, 0, 300, 301],
            outputRange: [-10, -10, -1, -1],
        });

        if (!openingTimeToday || !closingTimeToday) {
            text = `Hours not available`;
        } else if (isOpen) {
            text = `Open until ${formatTime(closingTimeToday)}`;
        } else if (isOpeningLater) {
            containerStyle = styles.barIsOpeningLaterContainer;
            text = `Opening at ${formatTime(openingTimeToday)}`;
        } else {
            containerStyle = styles.barIsClosedContainer;
            text = `Closed since ${formatTime(closingTimeToday)}`;
        }

        return (
            <View>
                <BoldText
                    style={[styles.navigationBarTitleText, { color: accentColor }]}>
                    {name}
                </BoldText>
                <BoldText
                    style={[styles.navigationBarTitleText, { color: accentColor }]}>
                    {text}
                </BoldText>
            </View>
        );
    }

    _handlePressDirections = () => {
        let {address, postalCode, city} = this.props.stadium;

        let daddr = encodeURIComponent(`${address} ${postalCode}, ${city}`);

        if (Platform.OS === 'ios') {
            Linking.openURL(`http://maps.apple.com/?daddr=${daddr}`);
        } else {
            Linking.openURL(`http://maps.google.com/?daddr=${daddr}`);
        }
    };
}

function getBarStyle(color) {
    if (color === '#fff' || color === '#f8fcf7' || color === '#fab234') {
        return 'default';
    } else {
        return 'light-content';
    }
}

const HeroHeight = 370;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    contentContainerStyle: {
        paddingBottom: 20,
        backgroundColor: '#FAFAFA',
        minHeight: Layout.window.height - HeroHeight,
    },
    heroSpacer: {
        width: Layout.window.width,
        height: HeroHeight,
        backgroundColor: 'transparent',
    },
    heroImage: {
        width: 210,
        height: 190,
        marginTop: 80,
    },
    heroBackground: {
        height: HeroHeight + 250,
    },
    hero: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: HeroHeight,
        paddingTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heroBottomGradientContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
    navigationBarTitleText: {
        color: '#fff',
        textAlign: 'center',
    },
    navigationBarAction: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navigationBarTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navigationBarShadowContainer: {
        position: 'absolute',
        top: Layout.HEADER_HEIGHT,
        left: 0,
        right: 0,
        height: 15,
        bottom: 0,
    },
    navigationBarShadow: {
        height: 15,
        width: Layout.window.width,
    },
    navigationBar: {
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: Layout.HEADER_HEIGHT,
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 5,
    },
});

{/*<View style={styles.container}>
 <View style={{ flex: 1, marginTop: -50 }}>
 {this._renderHeroHeader()}

 <Animated.ScrollView
 scrollEventThrottle={16}
 style={StyleSheet.absoluteFill}
 onScroll={Animated.event(
 [{ nativeEvent: { contentOffset: { y: scrollY } } }],
 { useNativeDriver: true }
 )}>
 <View style={styles.heroSpacer} />

 <View style={styles.contentContainerStyle}>
 <MapCard
 stadium={stadium}
 onPress={this._handlePressDirections}
 />
 <SummaryCard text={stadium.summary} />
 <DescriptionCard text={stadium.description} />
 <InstagramPhotosCard profile={stadium.instagram} />
 <VisitedCard stadiumId={this.props.stadium.id} />
 </View>
 </Animated.ScrollView>
 </View>

 {this._renderNavigationBarShadow()}
 {this._renderNavigationBar()}

 <StatusBar barStyle={getBarStyle(stadium.color)} />
 </View>*/
}
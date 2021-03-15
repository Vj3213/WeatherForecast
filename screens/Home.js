import React, { Component } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import api from '../api';
import Geolocation from '@react-native-community/geolocation';

class Home extends Component {

    constructor(props) {
        super(props);
        //Default Mumbai
        this.coords = {
            lat: 19.0144,
            lon: 72.8479
        }
        this.currDate = new Date().getTime();
        this.daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this.oneDayInMilliseconds = 1000 * 60 * 60 * 24;
    }

    componentDidMount() {
        Geolocation.getCurrentPosition(pos => {
            if (pos && pos.coords) {
                const { latitude, longitude } = pos.coords;
                this.coords = {
                    lat: latitude,
                    lon: longitude
                }
            }
            this.fetchWeatherData();
        })
    }

    fetchWeatherData = () => {
        this.props.dispatch({ type: 'FETCH_WEATHER_DATA' });
        // No city name data in onecall api, thats why we have to call weather api to get the city name to display
        api('/weather', this.coords, this.setCityName);
    }

    setCityName = (data) => {
        if (data && data.cod == 200) {
            this.props.dispatch({ type: 'SET_CITY_NAME', cityName: data.name });
            api('/onecall', this.coords, this.onDataArrived)
        } else {
            this.props.dispatch({ type: 'FETCH_WEATHER_DATA_FAILED' });
        }
    }

    onDataArrived = (data) => {
        if (data && data.cod && data.cod != 200) {
            this.props.dispatch({ type: 'FETCH_WEATHER_DATA_FAILED' });
        } else {
            this.props.dispatch({ type: 'FETCH_WEATHER_DATA_SUCCEED', data });
        }
    }

    renderErrComp = () => {
        return (
            <>
                <Text style={styles.errText}>Something Went Wrong at our End</Text>
                <TouchableOpacity style={styles.buttonCont} onPress={this.fetchWeatherData}>
                    <Text style={{ fontSize: 16 }}>RETRY</Text>
                </TouchableOpacity>
            </>
        )
    }

    renderEachDayWeather = ({ item, index }) => {
        const { temp: { day } } = item;
        const nextDayInMilliseconds = this.currDate + ((index + 1) * this.oneDayInMilliseconds); //Api data for date is wrong in onecall api hence we have to use this logic
        const nextDayInNumber = new Date(nextDayInMilliseconds).getDay();
        const nextDay = this.daysOfWeek[nextDayInNumber];

        return (
            <View style={styles.eachDayForecast}>
                <Text style={styles.dayText}>{nextDay}</Text>
                <Text style={styles.dayText}>{`${Math.round(day)} ℃`}</Text>
            </View>
        )
    }

    renderWeatherComp = () => {
        const { cityName, data: { current, daily } = {} } = this.props;
        const fiveDaysForecastData = daily ? daily.slice(0, 5) : [];
        return (
            <View style={styles.weatherCompContainer}>
                <FlatList
                    data={fiveDaysForecastData}
                    renderItem={this.renderEachDayWeather}
                    style={{ width: '100%'}}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ flex: 1, justifyContent: 'flex-end' }}
                />
                <View style={styles.currentDayTempCont}>
                    <Text style={styles.currentDayTempText}>{current && current.temp && `${Math.round(current.temp)}℃`}</Text>
                    <Text style={styles.currentDayLocationText}>{cityName}</Text>
                </View>
            </View>
        )
    }

    renderData = () => {
        const { isErrorOccurred } = this.props;
        if (isErrorOccurred) {
            return this.renderErrComp();
        } else {
            return this.renderWeatherComp();
        }

    }

    render() {
        const { isLoading } = this.props;
        return (
            <View style={styles.container}>
                {
                    isLoading
                        ? <ActivityIndicator size="large" />
                        : this.renderData()
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    errText: {
        fontSize: 54,
        fontWeight: '500',
        opacity: 0.8,
        marginHorizontal: 40
    },
    buttonCont: {
        borderWidth: 1.5,
        padding: 16,
        paddingHorizontal: 40,
        marginTop: 100
    },
    weatherCompContainer: {
        flex: 1,
        flexDirection: 'column-reverse',
        width: '100%',
    },
    eachDayForecast: {
        flexDirection: 'row',
        paddingVertical: 16,
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingRight: 32,
        alignItems: 'center',
        borderTopWidth: 1
    },
    dayText: {
        fontSize: 24,
        fontWeight: '600',
        opacity: 0.6
    },
    currentDayTempCont: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    currentDayTempText: {
        fontSize: 120,
        fontWeight: '500',
    },
    currentDayLocationText: {
        fontSize: 32,
        fontWeight: '500'
    }
})

const mapStateToProps = (state) => ({ ...state })

export default connect(mapStateToProps)(Home);
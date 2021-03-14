import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import api from '../api';

class Home extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_WEATHER_DATA' });
        api('Mumbai', this.onDataArrived)
    }

    onDataArrived = (data = {}) => {
        if (data.cod == 200) {
            this.props.dispatch({ type: 'FETCH_WEATHER_DATA_SUCCEED', data });
        } else {
            this.props.dispatch({ type: 'FETCH_WEATHER_DATA_FAILED' });
        }
    }

    render() {
        console.log("this--", this.props.data)
        return (
            <View />
        )
    }
}

const mapStateToProps = (state) => ({ ...state })

export default connect(mapStateToProps)(Home);
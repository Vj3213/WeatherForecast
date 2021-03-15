const initialState = {
    isLoading: true,
    data: null,
    isErrorOccurred: false,
    cityName: null
}

const weather = (state = initialState, action) => {
    switch(action.type) {
        case 'FETCH_WEATHER_DATA': {
            return {
                ...state,
                isLoading: true
            }
        }

        case 'FETCH_WEATHER_DATA_SUCCEED': {
            const { data: { current, daily } = {} } = action;
            return {
                ...state,
                isLoading: false,
                isErrorOccurred: false,
                data: {
                    current,
                    daily
                }
            }
        }

        case 'FETCH_WEATHER_DATA_FAILED': {
            return {
                ...state,
                isLoading: false,
                isErrorOccurred: true
            }
        }

        case 'SET_CITY_NAME':{
            const { cityName } = action
            return {
                ...state,
                cityName
            }
        }

        default:
            return state;
    }
}

export default weather;
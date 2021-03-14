const initialState = {
    isLoading: false
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
            return {
                ...state,
                isLoading: false
            }
        }

        case 'FETCH_WEATHER_DATA_FAILED': {
            return {
                ...state,
                isLoading: false
            }
        }

        default:
            return state;
    }
}

export default weather;
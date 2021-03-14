const initialState = {
    isLoading: false,
    data: null,
    isErrorOccurred: false
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
            const { data: { main } = {} } = action;
            return {
                ...state,
                isLoading: false,
                isErrorOccurred: false,
                data: main
            }
        }

        case 'FETCH_WEATHER_DATA_FAILED': {
            return {
                ...state,
                isLoading: false,
                isErrorOccurred: true
            }
        }

        default:
            return state;
    }
}

export default weather;
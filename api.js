import { create } from 'apisauce';

const api = create({
    baseURL: 'http://api.openweathermap.org/data/2.5/weather',
    headers: { Accept: 'application/json' }
})

const params = {
    appid: '3751957f24b7d7c701502d44e73a7bec',
    units: 'metric'
}

export default (location, callback) => {
    params.q = location
    api
        .get(null, params)
        .then(resp => callback(resp && resp.data))
}
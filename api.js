import { create } from 'apisauce';

const api = create({
    baseURL: 'http://api.openweathermap.org/data/2.5',
    headers: { Accept: 'application/json' }
})

let params = {
    appid: '3751957f24b7d7c701502d44e73a7bec',
    units: 'metric',
    exclude: 'minutely,hourly,alerts'
}

export default (url, coords, callback) => {
    params = {
        ...params,
        ...coords
    }
    api
        .get(url, params)
        .then(resp => callback(resp && resp.data))
}
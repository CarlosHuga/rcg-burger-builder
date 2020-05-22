import axios from 'axios'

const instance = axios.create(
    {
        baseURL: 'https://rcg-burger-builder-c8014.firebaseio.com/'
    }
)
export default instance;
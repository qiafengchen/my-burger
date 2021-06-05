import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-7035e.firebaseio.com/'
});

export default instance;
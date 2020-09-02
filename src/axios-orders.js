import axios from 'axios';

const instance = axios.create({
    baseURL: "https://reactjs-burger-ff2b1.firebaseio.com/"
});

export default instance;
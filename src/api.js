import axios from 'axios';

const api = axios.create({
    baseURL: 'https://ec2-3-106-176-252.ap-southeast-2.compute.amazonaws.com/api',
});

export default api;

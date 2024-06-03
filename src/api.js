import axios from 'axios';

const api = axios.create({
    baseURL: 'ec2-3-106-176-252.ap-southeast-2.compute.amazonaws.com',
});

export default api;

import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:8000/api/',
    // headers: {'X-Custom-Header': 'foobar'}
});

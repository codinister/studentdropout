import axios from 'axios';

const client = axios.create({
  baseURL: '/api',
});

const fetchApi = ({ ...options }) => {
  return client(options)
    .then((data) => data)
    .catch((error) => error);
};

export default fetchApi;

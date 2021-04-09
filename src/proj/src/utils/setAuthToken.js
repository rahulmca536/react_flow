import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['authorization'] = token;
    axios.defaults.headers.common['dev'] = 'u8Xhg;C3gL9?LDBQWc9V]7%N?Htd';
  } else {
    delete axios.defaults.headers.common['authorization'];
    delete axios.defaults.headers.common['dev'];
  }
};

export default setAuthToken;

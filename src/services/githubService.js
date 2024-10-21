// githubService.js

import axios from 'axios';

const githubService = {
  getUserRepos() {
    return axios.get(`https://api.github.com/users/lennyhurni/repos`);
  }
};

export default githubService;

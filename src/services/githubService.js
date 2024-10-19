import axios from 'axios';

const githubService = {
  getUserRepos(username) {
    return axios.get(`https://api.github.com/users/lennyhurni/repos`);
  }
};

export default githubService;
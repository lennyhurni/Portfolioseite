import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com/users';
const GITHUB_USERNAME = process.env.VUE_APP_GITHUB_USERNAME || 'lennyhurni';

const githubService = {
  getUserRepos(username = GITHUB_USERNAME) {
    return axios.get(`${GITHUB_API_URL}/${username}/repos`);
  },
};

export default githubService;
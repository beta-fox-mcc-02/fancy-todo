function register(data){
  return axios({
    method: 'post',
    url: 'http://localhost:3000/register',
    data
  })
  
}

function login(data){
  return axios({
    method: 'post',
    url: 'http://localhost:3000/login',
    data
  })
}

function findAll(){
  return axios({
    method: 'get',
    url: 'http://localhost:3000/todos',
    headers: {
      access_token: localStorage.access_token
    }
  })
}

function create(data){
  return axios({
    method: 'post',
    url: 'http://localhost:3000/todos',
    headers: {
      access_token: localStorage.access_token
    },
    data
  })
}

// authenticate with backend for google sign in
function googleSignIn(access_token){
  return axios({
    method: 'post',
    url: 'http://localhost:3000/googleSignIn',
    headers: {
      access_token
    }
  })
}
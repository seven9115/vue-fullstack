import axios from 'axios'
export function fetch (url, params) {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.token
    axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'
    axios.post(url, params)
      .then(response => {
        resolve(response.data)
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
  })
}

export default {
  loginApi (user, password) {
    return fetch('/api/login', 'user=' + user + '&password=' + password)
  },
  authTokenApi () {
    return fetch('/api/authToken')
  },
  uploadApi (param, config) {
    return fetch('/api/uploader', param, config)
  }
} 
 
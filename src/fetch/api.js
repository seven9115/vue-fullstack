import axios from 'axios'
export function fetch (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url)
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
  testApi () {
    return fetch('/api/user/getAccount')
  }
}

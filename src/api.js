import axios from 'axios'

async function getAll(url) {
  // const header = {
  //   Authorization: 'Bearer ',
  // }
  // console.log(header)
  let items = null
  await axios.get(url).then(result => {
    const { data } = result.data
    items = [...data]
  })

  return items
}
async function register(url, json) {
  let JSON = {}
  await axios
    .post(url, json)
    .then(result => {
      const { data } = result.data
      const { message } = result.data
      const { status } = result
      JSON = {
        data,
        message,
        status,
      }
    })
    .catch(error => {
      if (error.response) {
        const { errors } = error.response.data
        const { status } = error.response
        JSON = {
          errors,
          status,
        }
      }
    })

  return JSON
}
async function update(url, json) {
  let JSON = {}
  await axios
    .put(url, json)
    .then(result => {
      const { data } = result.data
      const { message } = result.data
      const { status } = result
      JSON = {
        data,
        message,
        status,
      }
    })
    .catch(e => {
      if (e.response) {
        const { errors } = e.response.data
        const { status } = e.response
        JSON = {
          errors,
          status,
        }
      }
    })

  return JSON
}
async function destroy(url) {
  let JSON = {}
  await axios
    .delete(url)
    .then(result => {
      const { message } = result.data
      const { status } = result
      JSON = {
        message,
        status,
      }
    })
    .catch(e => {
      if (e.response) {
        const { errors } = e.response.data
        const { status } = e.response
        JSON = {
          errors,
          status,
        }
      }
    })

  return JSON
}
async function getDeleted(url) {
  let JSON = {}
  await axios
    .get(url)
    .then(result => {
      const { data } = result.data
      const { status } = result
      JSON = {
        data,
        status,
      }
    })
    .catch(error => {
      if (error.response) {
        const { errors } = error.response.data
        const { status } = error.response
        JSON = {
          errors,
          status,
        }
      }
    })

  return JSON
}
async function restore(url) {
  let JSON = {}
  await axios
    .put(url)
    .then(result => {
      const { data } = result.data
      const { message } = result.data
      const { status } = result
      JSON = {
        data,
        message,
        status,
      }
    })
    .catch(e => {
      if (e.response) {
        const { errors } = e.response.data
        const { status } = e.response
        JSON = {
          errors,
          status,
        }
      }
    })

  return JSON
}
async function login(url, json) {
  let JSON = {}
  await axios
    .post(url, json)
    .then(result => {
      const { token } = result.data
      const { message } = result.data
      const { status } = result
      JSON = {
        token,
        message,
        status,
        info: result,
      }
    })
    .catch(error => {
      if (error.response) {
        // const { errors } = error.response.data
        // const { status } = error.response
        JSON = {
          errors: error.response,
        }
      }
    })

  return JSON
}
async function csrf() {
  const response = axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie')

  return response
}
export default {
  getAll,
  register,
  update,
  destroy,
  getDeleted,
  restore,
  login,
  csrf,
}

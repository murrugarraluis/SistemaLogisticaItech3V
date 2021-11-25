import axios from 'axios'

async function getAll(url) {
  let items = null
  await axios.get(url).then(result => {
    const { data } = result.data
    items = [...data]
  })

  return items
}
async function save(url, json) {
  let JSON = { }
  await axios.post(url, json).then(result => {
    const { data } = result.data
    const { message } = result.data
    const { status } = result
    JSON = {
      data,
      message,
      status,
    }
  }).catch(error => {
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
  let JSON = { }
  await axios.put(url, json).then(result => {
    const { data } = result.data
    const { message } = result.data
    const { status } = result
    JSON = {
      data,
      message,
      status,
    }
  }).catch(e => {
    if (e.response) {
      const { errors } = e.response.data
      const { status } = e.response
      if (errors) {
        JSON = {
          errors,
          status,
        }
      } else {
        const { error } = e.response.data
        JSON = {
          error,
          status,
        }
      }
    }
  })

  return JSON
}
async function destroy(url) {
  let JSON = { }
  await axios.delete(url).then(result => {
    const { message } = result.data
    const { status } = result
    JSON = {
      message,
      status,
    }
  }).catch(e => {
    if (e.response) {
      const { error } = e.response.data
      const { status } = e.response
      JSON = {
        error,
        status,
      }
    }
  })

  return JSON
}
export default {
  getAll, save, update, destroy,
}

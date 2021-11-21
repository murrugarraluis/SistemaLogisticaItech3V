import axios from 'axios'

async function getAll(url) {
  let items = null
  await axios.get(url).then(result => {
    const { data } = result.data
    items = [...data]
  })

  return items
}
async function destroy(url) {
  let json = { }
  await axios.delete(url).then(result => {
    const { message } = result.data
    const { status } = result
    json = {
      message,
      status,
    }
  }).catch(e => {
    if (e.response) {
      const { error } = e.response.data
      const { status } = e.response
      json = {
        error,
        status,
      }
    }
  })

  return json
}
export default { getAll, destroy }

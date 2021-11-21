import axios from 'axios'

async function get(url) {
  let items = null
  await axios.get(url).then(result => {
    const { data } = result.data
    items = [...data]
  })

  return items
}
export default { get }

const { network } = require('../utils')

const handleStreamData = data => {
  try {
    const json = JSON.parse(data)
    console.log(json)
  } catch (e) {
    // do nothing because it's a heartbeat
  }
}

const handleStreamError = error => {
  console.error(error)
  if (error.code === 'ETIMEDOUT') {
    stream.emit('timeout')
  }
}

function streamConnect(token) {
  const config = {
    url: 'https://api.twitter.com/labs/1/tweets/stream/filter?format=compact',
    auth: { bearer: token },
    headers: { 'User-Agent': 'HuruBot' },
    timeout: 20000,
  }

  const stream = network.unmodifiedGet(config)

  stream
    .on('start', () => console.log('stream started'))
    .on('data', handleStreamData)
    .on('error', handleStreamError)
    .on('end', () => console.log('stream stopped'))

  return stream
}

module.exports = streamConnect

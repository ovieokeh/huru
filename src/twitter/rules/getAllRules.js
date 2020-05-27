const { network } = require('../../utils')

async function getAllRules(token) {
  const requestConfig = {
    url: 'https://api.twitter.com/labs/1/tweets/stream/filter/rules',
    auth: {
      bearer: token,
    },
  }

  const response = await network.get(requestConfig)

  if (response.statusCode !== 200) {
    throw new Error(response.body)
  }

  return JSON.parse(response.body)
}

module.exports = getAllRules

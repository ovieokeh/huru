const { network } = require('../../utils')

async function setRules(rules, token) {
  const requestConfig = {
    url: 'https://api.twitter.com/labs/1/tweets/stream/filter/rules',
    auth: {
      bearer: token,
    },
    json: {
      add: rules,
    },
  }

  const response = await network.post(requestConfig)

  if (response.statusCode !== 201) {
    throw new Error(JSON.stringify(response.body))
  }

  return response.body
}

module.exports = setRules

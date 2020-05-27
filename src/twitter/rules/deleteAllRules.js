const { network } = require('../../utils')

async function deleteAllRules(rules, token) {
  if (!Array.isArray(rules.data)) {
    return null
  }

  const ids = rules.data.map((rule) => rule.id)

  const requestConfig = {
    url: 'https://api.twitter.com/labs/1/tweets/stream/filter/rules',
    auth: {
      bearer: token,
    },
    json: {
      delete: {
        ids,
      },
    },
  }

  const response = await network.post(requestConfig)

  if (response.statusCode !== 200) {
    throw new Error(JSON.stringify(response.body))
  }

  return response.body
}

module.exports = deleteAllRules

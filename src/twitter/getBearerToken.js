const { getSecret, network } = require('../utils')

async function getBearerToken() {
  const CONSUMER_KEY = await getSecret('twitter_consumer_key/versions/1')
  const CONSUMER_SECRET = await getSecret('twitter_consumer_secret/versions/1')

  const requestConfig = {
    url: 'https://api.twitter.com/oauth2/token',
    auth: {
      user: CONSUMER_KEY,
      pass: CONSUMER_SECRET,
    },
    form: {
      grant_type: 'client_credentials',
    },
  }

  const response = await network.post(requestConfig)
  const body = JSON.parse(response.body)

  if (response.statusCode !== 200) {
    const error = body.errors.pop()
    throw Error(`Error ${error.code}: ${error.message}`)
  }

  return JSON.parse(response.body).access_token
}

module.exports = getBearerToken

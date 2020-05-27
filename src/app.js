const { getBearerToken, streamConnect } = require('./twitter')
const {
  getAllRules,
  deleteAllRules,
  setAllRules,
  rules,
} = require('./twitter/rules')
const { sleep } = require('./utils')

;(async function app() {
  let currentRules, stream
  let timeout = 0

  const token = await getBearerToken().catch((e) => {
    console.error(`Could not generate a Bearer token. Error: ${e}`)
    process.exit(-1)
  })

  try {
    // Gets the complete list of rules currently applied to the stream
    currentRules = await getAllRules(token)

    // Delete all rules
    await deleteAllRules(currentRules, token)

    // Add rules to the stream
    await setAllRules(rules, token)
  } catch (e) {
    console.error(e)
    process.exit(-1)
  }

  // Listen to the stream.
  // This reconnection logic will attempt to reconnect when a disconnection is detected.
  // To avoid rate limites, this logic implements exponential backoff, so the wait time
  // will increase if the client cannot reconnect to the stream.
  const connect = () => {
    try {
      stream = streamConnect(token)

      stream.on('timeout', async () => {
        // Reconnect on error
        console.warn('A connection error occurred. Reconnecting…', timeout)

        timeout += 1
        stream.abort()

        await sleep(2 ** timeout * 1000)
        connect()
      })
    } catch (e) {
      connect()
    }
  }

  connect()
})()

const { SecretManagerServiceClient } = require('@google-cloud/secret-manager')

const client = new SecretManagerServiceClient()

// allows us to retreive sensitive data during runtime
async function getSecret(secret) {
  const secretName = `projects/324158371881/secrets/${secret}`

  const [accessResponse] = await client.accessSecretVersion({
    name: secretName,
  })

  const responsePayload = accessResponse.payload.data.toString('utf8')
  return responsePayload
}

module.exports = getSecret

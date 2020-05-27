const { SecretManagerServiceClient } = require('@google-cloud/secret-manager')

const client = new SecretManagerServiceClient()

// allows us to retreive sensitive data during runtime
async function getSecret(secret) {
  const secretName = `projects/520252572579/secrets/${secret}`

  const [accessResponse] = await client.accessSecretVersion({
    name: secretName,
  })

  const responsePayload = accessResponse.payload.data.toString('utf8')
  return responsePayload
}

module.exports = getSecret

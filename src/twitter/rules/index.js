const getAllRules = require('./getAllRules')
const setAllRules = require('./setRules')
const deleteAllRules = require('./deleteAllRules')

module.exports = {
  getAllRules,
  setAllRules,
  deleteAllRules,
  rules: [{ value: 'okeh', tag: 'test tag' }],
}

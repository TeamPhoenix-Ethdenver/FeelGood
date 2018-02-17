var FeelGood = artifacts.require('./FeelGood.sol')

module.exports = function (callback) {
  let instance
  FeelGood.deployed().then(i => {
    instance = i
  }).then(() => {
    // instance.adminAddRole('0x824fcdc476f1c85f9fa5f27f8f0c6ce630b7ee74', 'DonationCenter')
    console.log('adding donation center')
    return instance.adminAddRole('0x14f3ee842d4f75cf378b6bac220ce5aae7ad1805', 'DonationCenter')
  }).then(() => {
    console.log('adding test center')
    return instance.adminAddRole('0x14f3ee842d4f75cf378b6bac220ce5aae7ad1805', 'TestCenter')
  }).then(() => {
    console.log('adding hospital')
    return instance.adminAddRole('0x14f3ee842d4f75cf378b6bac220ce5aae7ad1805', 'Hospital')
  }).then(callback)
}

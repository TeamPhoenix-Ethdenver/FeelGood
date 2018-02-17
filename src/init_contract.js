var FeelGood = artifacts.require('./FeelGood.sol')

module.exports = function (callback) {
  let instance
  FeelGood.deployed().then(i => {
    instance = i
  }).then(() => {
    // instance.adminAddRole('0x824fcdc476f1c85f9fa5f27f8f0c6ce630b7ee74', 'DonationCenter')
    console.log('adding donation center')
    return instance.adminAddRole('0x49757b42aE5D2566ed138acFE70a27b7f58d6d1a', 'DonationCenter')
  }).then(() => {
    console.log('adding test center')
    return instance.adminAddRole('0x49757b42aE5D2566ed138acFE70a27b7f58d6d1a', 'TestCenter')
  }).then(() => {
    console.log('adding health center')
    return instance.adminAddRole('0x49757b42aE5D2566ed138acFE70a27b7f58d6d1a', 'HealthCenter')
  }).then(() => {
    console.log('adding Alice')
    return instance.setDonor('Alice', 18, 'Female', 'A+', new Date().getTime())
  }).then(() => {
    console.log('adding Bob')
    return instance.setDonor('Bob', 26, 'Male', 'O+', new Date(Date.now() - 20 * 24 * 60 * 60 * 1000 - 300).getTime())
  }).then(() => {
    console.log('adding Claire')
    return instance.setDonor('Claire', 48, 'Female', 'B-', new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 100).getTime())
  }).then(() => {
    console.log('adding David')
    return instance.setDonor('David', 32, 'Male', 'AB+', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 - 100).getTime())
  }).then(() => {
    console.log('approving Alice')
    return instance.isTested(1, true)
  }).then(() => {
    console.log('rejecting Bob')
    return instance.isTested(2, false)
  }).then(() => {
    console.log('approving Claire')
    return instance.isTested(3, true)
  }).then(() => {
    console.log('consuming Claire')
    return instance.isConsumed(3)
  }).then(callback)
}

var FeelGood = artifacts.require('./FeelGood.sol')

// 0x824fcdc476f1c85f9fa5f27f8f0c6ce630b7ee74
const DonationCenterAddr = '0x0d6eafe9Ca0258b97839b07230A7EA8Fa61b632A'
const TestCenterAddr = '0x0d6eafe9Ca0258b97839b07230A7EA8Fa61b632A'
const HealthCenterAddr = '0x0d6eafe9Ca0258b97839b07230A7EA8Fa61b632A'

module.exports = function (callback) {
  let instance
  FeelGood.deployed().then(i => {
    instance = i
  }).then(() => {
    console.log('adding roles')
    return Promise.all([
      instance.adminAddRole(DonationCenterAddr, 'DonationCenter').then(console.log),
      instance.adminAddRole(TestCenterAddr, 'TestCenter').then(console.log),
      instance.adminAddRole(HealthCenterAddr, 'HealthCenter').then(console.log)
    ])
  }).then(() => {
    console.log('adding Alice, Bob, Claire, David')
    return Promise.all([
      instance.setDonor('Alice', 18, 'Female', 'A+', new Date().getTime()).then(console.log),
      instance.setDonor('Bob', 26, 'Male', 'O+', new Date(Date.now() - 20 * 24 * 60 * 60 * 1000 - 300).getTime()).then(console.log),
      instance.setDonor('Claire', 48, 'Female', 'B-', new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 100).getTime()).then(console.log),
      instance.setDonor('David', 32, 'Male', 'AB+', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 - 100).getTime()).then(console.log)
    ])
  }).then(() => {
    console.log('testing Alice, Bob, Claire')
    return Promise.all([
      instance.isTested(1, true).then(console.log),
      instance.isTested(2, false).then(console.log),
      instance.isTested(3, true).then(console.log)
    ])
  }).then(() => {
    console.log('consuming Claire')
    return instance.isConsumed(3)
  }).then(callback)
}

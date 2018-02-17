import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import JSONData from './build/contracts/FeelGood.json'

// const web3 = new Web3(new Web3.providers.HttpProvider('http://f1b0ea28.ngrok.io'))
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'))
window.web3 = web3
const FeelGood = TruffleContract(JSONData)
FeelGood.setProvider(web3.currentProvider)
FeelGood.defaults({ gas: 500000 })
// FIXME: https://github.com/trufflesuite/truffle-contract/issues/56#issuecomment-331084530
if (typeof FeelGood.currentProvider.sendAsync !== 'function') {
  FeelGood.currentProvider.sendAsync = function () {
    return FeelGood.currentProvider.send.apply(
      FeelGood.currentProvider, arguments
    )
  }
}

export const getByID = id => FeelGood.deployed().then(i => i.donors(id))

export const onStage1Event = callback => FeelGood.deployed()
  .then(i => i.DonorCreatedEvent({}, { fromBlock: 0, toBlock: 'latest' })
    .watch((err, ev) => {
      if (!err) {
        callback(ev.args)
      }
    })
  )

export const newStage1 = (nameOfDonor, age, sex, bloodGroup, donationTime) => web3.eth.getCoinbase()
  .then(from => FeelGood.defaults({ from }))
  .then(() => FeelGood.deployed())
  .then(i => i.setDonor(nameOfDonor, age, sex, bloodGroup, donationTime))

export const hasRole = role => FeelGood.deployed()
  .then(i => i.hasRole(sessionStorage.getItem('address'), role))

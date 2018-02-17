import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import JSONData from './build/contracts/FeelGood.json'

const web3 = new Web3('http://localhost:9545')
const FeelGood = TruffleContract(JSONData)
FeelGood.setProvider(web3.currentProvider)

export const newStage1 = (name, age, gender, bloodGroup, donationTime) => FeelGood.deployed()
  .then(i => i.setDonor(
    name,
    age,
    gender,
    bloodGroup
  ))

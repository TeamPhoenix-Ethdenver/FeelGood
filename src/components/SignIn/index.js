import React, { Component } from 'react'
import { Connect, SimpleSigner } from 'uport-connect'
import { decode } from 'mnid'
// import Web3 from 'web3'

import Key from '../../key.json'

export default class SignIn extends Component {
  constructor ({ location }) {
    super()
    this.state = location.state
  }
  render () {
    sessionStorage.removeItem('address')
    sessionStorage.removeItem('userProfile')

    const uport = new Connect('Feel Good', {
      clientId: '2ojfezeSJ1a1tzK7kx18txych3enQ5E2yyH',
      network: 'rinkeby',
      signer: SimpleSigner(Key.uPortSigner)
    })

    // const web3 = new Web3('http://localhost:9545')
    // web3.eth.getCoinbase()
    //   .then(address => {
    //     console.group('ganache')
    //     console.log(address)
    //     sessionStorage.setItem('address', address)
    //     sessionStorage.setItem('userProfile', JSON.stringify({ name: 'ganache' }))
    //     console.groupEnd()
    //   })
    uport.requestCredentials({
      requested: ['name', 'avatar', 'phone', 'country'],
      notifications: true
    })
      .then(userProfile => {
        console.group('userProfile: ')
        const address = decode(userProfile.address).address
        console.dir(userProfile)
        console.dir(address)
        console.groupEnd()
        sessionStorage.setItem('address', address)
        sessionStorage.setItem('userProfile', JSON.stringify(userProfile))
      })
      .then(() => {
        window.location.href = this.state ? this.state.from.pathname : '/'
      })
    return (
      <div />
    )
  }
}

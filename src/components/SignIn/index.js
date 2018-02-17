import React, { Component } from 'react'
import { Connect, SimpleSigner } from 'uport-connect'
import Key from '../../key.json'
import { decode } from 'mnid'

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
      .then() // TODO: call the contract to figure out user role
      .then(() => {
        window.location.href = this.state ? this.state.from.pathname : '/'
      })
    return (
      <div />
    )
  }
}

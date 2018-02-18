import { Connect, SimpleSigner } from 'uport-connect'
// import { decode } from 'mnid'

import Key from './key.json'

export const uport = new Connect('Feel Good', {
  clientId: '2ojfezeSJ1a1tzK7kx18txych3enQ5E2yyH',
  network: 'rinkeby',
  signer: SimpleSigner(Key.uPortSigner)
})

export const login = () => uport.requestCredentials({
  requested: ['name', 'avatar', 'phone', 'country'],
  notifications: true
})
  // .then(userProfile => {
  //   console.group('userProfile: ')
  //   console.dir(userProfile)
  //   const address = decode(userProfile.address).address
  //   window.uport = uport
  //   console.log(address)
  //   console.groupEnd()
  //   sessionStorage.setItem('address', address)
  //   sessionStorage.setItem('userProfile', JSON.stringify(userProfile))
  // })

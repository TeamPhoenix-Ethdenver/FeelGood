module.exports = {
  networks: {
    ganache: {
      host: '127.0.0.1',
      port: 9545,
      network_id: '*' // Match any network id
    },
    rinkeby: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '4'
    }
  }
}

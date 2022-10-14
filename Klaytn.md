**⭓ Klaytn:** We have used Klaytn Baobab Testnet for deploying smart contracts of
**1) Escrow Agreement**

## Klaytn Implementation:

https://github.com/GigConomy/GigConomy/blob/master/hardhat.config.js

```  
module.exports = {
  networks: {
    hardhat: {},
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_KEY}`,
      accounts: [process.env.REACT_APP_PRIVATE_KEY],
    },
    klaytn: { 
      url: "https://api.baobab.klaytn.net:8651", 
      accounts: [process.env.REACT_APP_PRIVATE_KEY], 
    },
  },

  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
```


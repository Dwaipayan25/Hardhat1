/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");

const ALCHEMY_API_KEY="chxZO1gHtRpoF8iIJRvrkpQOgAmK2WqP";
const GOERLI_PRIVATE_KEY="9b77d8733b45789bd5d3201656593bb8627380e52068cd02bdd3a7745f27ee45";


module.exports = {
  solidity: "0.8.17",

  networks: {
    goerli:{
      url: `https://eth-goerli.g.alchemy.com/v2/chxZO1gHtRpoF8iIJRvrkpQOgAmK2WqP`,
      accounts: [`${GOERLI_PRIVATE_KEY}`],
    }
  }
};

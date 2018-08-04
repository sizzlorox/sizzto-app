const React = require('react');
const Web3 = require('web3');
const Tx = require('ethereumjs-tx');
// Key buffer taken from Web3.js docs example
const privateKey = new Buffer('e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109', 'hex');

// Components
const Card = require('../components/card/Card');
const Modal = require('../components/modal/Modal');

class Test extends React.Component {

  constructor(props) {
    super(props);

    // TODO: Remove cors-anywhere when getting out of netlify especially to no have two ternaries
    this.state = {
      inuraUri: process.env.NODE_ENV.includes('production')
        ? process.env.NODE_ENV.includes('netlify') ? `https://cors-anywhere.herokuapp.com/https://ropsten.infura.io/v3/${process.env.INFURA_TOKEN}`
          : 'https://ropsten.infura.io/v3/${process.env.INFURA_TOKEN}'
        : `https://cors-anywhere.herokuapp.com/https://ropsten.infura.io/v3/${process.env.INFURA_TOKEN}`,
      faucetUri: process.env.NODE_ENV.includes('production')
        ? process.env.NODE_ENV.includes('netlify') ? `https://cors-anywhere.herokuapp.com/https://ropsten.faucet.b9lab.com/tap`
          : '//faucet.ropsten.be:3001/donate/'
        : `https://cors-anywhere.herokuapp.com/https://ropsten.faucet.b9lab.com/tap`,
      isConnected: false,
      modal: {
        show: false,
        title: '',
        content: ''
      }
    };
    this.web3 = new Web3(new Web3.providers.HttpProvider(this.state.inuraUri));
    this._addBalance = this._addBalance.bind(this);
    this._hideModal = this._hideModal.bind(this);
  }

  componentDidMount() {
    this.web3.eth.net.isListening()
      .then((isListening) => {
        const addresses = [
          {
            address: this.web3.eth.accounts.create().address,
            balance: 0,
            transactions: []
          },
          {
            address: this.web3.eth.accounts.create().address,
            balance: 0,
            transactions: []
          }
        ];
        this.setState({
          addresses,
          isConnected: isListening,
        });

        this.updateTimer1 = setInterval(() => this._updateBalance(this.state.addresses[0].address), 15000);
        this.updateTimer2 = setInterval(() => this._updateBalance(this.state.addresses[1].address), 15000);
      });
  }

  componentWillUnmount() {
    clearInterval(this.updateTimer1);
    clearInterval(this.updateTimer2);
  }

  _addBalance(address) {
    fetch(this.state.faucetUri,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toWhom: address
        })
      })
      .then(async (results) => {
        if (results.status !== 200) {
          results = await results.json();
          return this.setState({
            modal: {
              show: true,
              title: 'ERROR',
              content: results.errorMessage
            }
          });
        }

        return results.json();
      });
  }

  async _sendTransaction(address, amount) {
    const fromAddress = address;
    let toAddress;
    if (fromAddress === this.state.addresses[0].address) {
      toAddress = this.state.addresses[1].address;
      if (this.state.addresses[0].balance <= 0) {
        return this.setState({
          modal: {
            show: true,
            title: 'ERROR',
            content: 'Cannot send a transaction with a balance of 0.'
          }
        });
      }
    } else {
      toAddress = this.state.addresses[0].address;
      if (this.state.addresses[1].balance <= 0) {
        return this.setState({
          modal: {
            show: true,
            title: 'ERROR',
            content: 'Cannot send a transaction with a balance of 0.'
          }
        });
      }
    }
    // const signedData = await this.web3.eth.sign(tx, fromAddress);
    const weiAmount = await this.web3.utils.toWei(amount.toString(), 'ether');
    const nonce = await this.web3.eth.getTransactionCount(fromAddress) + 10496;
    const gasPrice = await this.web3.eth.estimateGas({
      from: fromAddress,
      to: toAddress,
      amount: weiAmount
    });
    const tx = new Tx({
      nonce: await this.web3.utils.toHex(nonce),
      from: await this.web3.utils.toHex(fromAddress),
      to: await this.web3.utils.toHex(toAddress),
      value: await this.web3.utils.toHex(weiAmount),
      gasLimit: await this.web3.utils.toHex(30000),
      gasPrice: await this.web3.utils.toHex(gasPrice),
      chainId: 3
    });
    await tx.sign(privateKey);
    const serializedTx = await tx.serialize();

    return this.web3.eth.sendSignedsTransaction('0x' + serializedTx.toString('hex'), (err, result) => {
      if (err) {
        console.log(err);
      }

      const updateArray = this.state.addresses;
      const index = updateArray.findIndex(account => account.address === address);
      updateArray[index].transactions.push({
        hash: result
      });

      return this.setState({
        addresses: updateArray
      });
    });
  }

  _updateBalance(address) {
    console.log(`Updating... ${address}`);
    this.web3.eth.getBalance(address, (err, wei) => {
      if (err) {
        console.log(err);
      }
      const tmpArray = this.state.addresses;
      const updateArray = this.state.addresses;
      const index = tmpArray.findIndex(account => account.address === address);
      updateArray[index].balance = this.web3.utils.fromWei(wei, 'ether');
      // Checking if transaction has been mined.
      tmpArray[index].transactions.forEach(reciept => {
        console.log(`Checking transaction ${reciept.hash}`);
        if (!reciept.blockHash) {
          this.web3.eth.getTransactionReceipt(reciept.hash, (err, transaction) => {
            if (err) {
              return console.log(err);
            }

            console.log(transaction);
            // Null if hasnt been mined yet or pending.
            if (transaction !== null) {
              updateArray[index].transactions.push({
                hash: transaction.hash,
                to: transaction.to,
                from: transaction.from,
                blockHash: transaction.blockHash,
                blockNumber: transactions.blockNumber,
                amount: transaction.value,
                gas: transaction.gas,
                gasPrice: transaction.gasPrice
              });
            }
          });
        }
      });

      this.setState({
        addresses: updateArray
      });
    });
  }

  _hideModal() {
    this.setState({
      modal: {
        show: false,
        title: '',
        content: ''
      }
    });
  };

  render() {
    return !this.state.isConnected
      ? (
        <React.Fragment>
          NOT CONNECTED
        </React.Fragment>
      )
      : (
        <React.Fragment>
          <div className={classnames('test-info')}>
            <h5>Do not spam the faucet please.</h5>
            <p>
              This is a test connecting to a TestNet Ropsten (ETH). Utilizing a public faucet and web3.js to connect, check balance and send transactions.
              <br />
              Two new addresses are created upon loading this component.
              <br />
              The balance is updated every 5s.
            </p>
          </div>
          <div className={classnames('card-list')}>
            {
              this.state.addresses.map((account, index) => {
                return (
                  <Card key={index} title={`Address: ${account.address}`}>
                    <section>
                      {`Balance: ${account.balance}`}
                      <br />
                      <button onClick={() => this._addBalance(account.address)}>Open faucet</button>
                      <button onClick={() => this._sendTransaction(account.address, 0.1)}>Send to other address</button>
                    </section>
                    <div className={classnames('card-list')}>
                      {account.transactions.map((transaction, tIndex) => {
                        return (
                          <Card key={tIndex} title={`Transaction Hash: ${transaction.hash}`}>
                            <section>
                              {transaction.to ? `To: ${transaction.to}` : ''}
                              <br />
                              {transaction.blockHash ? `Block Hash: ${transaction.blockHash}` : ''}
                              <br />
                              {transaction.blockNumber ? `Block Number: ${transaction.blockNumber}` : ''}
                              <br />
                              {transaction.amount ? `Amount: ${transaction.amount}` : ''}
                              <br />
                              {transaction.gas ? `Gas: ${transaction.gas}` : ''}
                              <br />
                              {transaction.gasPrice ? `Gas Price: ${transaction.gasPrice}` : ''}
                              <br />
                            </section>
                          </Card>
                        )
                      })}
                    </div>
                  </Card>
                )
              })
            }
          </div>
          <Modal show={this.state.modal.show} handleClose={this._hideModal}>
            <p>{this.state.modal.title}</p>
            <p>{this.state.modal.content}</p>
          </Modal>
        </React.Fragment>
      );
  }

}
module.exports = Test;
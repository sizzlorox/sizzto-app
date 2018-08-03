const React = require('react');
const Web3 = require('web3');

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
        ? process.env.NODE_ENV.includes('netlify') ? `https://cors-anywhere.herokuapp.com/http://faucet.ropsten.be:3001/donate/`
          : '//faucet.ropsten.be:3001/donate/'
        : `https://cors-anywhere.herokuapp.com/http://faucet.ropsten.be:3001/donate/`,
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
            balance: 0
          },
          {
            address: this.web3.eth.accounts.create().address,
            balance: 0
          }
        ];
        this.setState({
          addresses,
          isConnected: isListening,
        });

        this.updateTimer1 = setInterval(this._updateBalance(this.state.addresses[0].address), 5000);
        this.updateTimer2 = setInterval(this._updateBalance(this.state.addresses[1].address), 5000);
      });
  }

  componentWillUnmount() {
    clearInterval(this.updateTimer);
  }

  _addBalance(address) {
    fetch(faucetUri.concat(address))
      .then(async (results) => {
        // TODO: create handleError helper
        if (results.status !== 200) {
          results = await results.json();
          if (results.duration) {
            const date = new Date(Date.now() + results.duration);
            return this.setState({
              modal: {
                show: true,
                title: 'ERROR',
                content: `You have been greylisted. Try not to spam the button.\nPlease wait until ${date.toISOString()} to try again.`
              }
            });
          } else {
            return this.setState({
              modal: {
                show: true,
                title: 'ERROR',
                content: results.message
              }
            });
          }
        }

        return results.json();
      });
  }

  _sendTransaction(address) {
    // TODO: complete
  }

  _updateBalance(address) {
    this.web3.eth.getBalance(address, (err, wei) => {
      if (err) {
        console.log(err);
      }
      const tmpArray = this.state.addresses;
      tmpArray[tmpArray.findIndex(account => account.address === address)].balance = this.web3.utils.fromWei(wei, 'ether');
      this.setState({
        addresses: tmpArray
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
          <Modal show={this.state.modal.show} handleClose={this._hideModal}>
            <p>{this.state.modal.title}</p>
            <p>{this.state.modal.content}</p>
          </Modal>
          <div className={classnames('card-list')}>
            {
              this.state.addresses.map((account, index) => {
                return (
                  <Card key={index} title={`Address: ${account.address}`}>
                    <section>
                      {`Balance: ${account.balance}`}
                      <br />
                      <button onClick={() => this._addBalance(account.address)}>Open faucet</button>
                      <button onClick={() => this._sendTransaction(account.address)}>Send to other address</button>
                    </section>
                  </Card>
                )
              })
            }
          </div>
        </React.Fragment>
      );
  }

}
module.exports = Test;
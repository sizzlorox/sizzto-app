// Components
const Navbar = require('./components/nav-bar/Navbar');
const Header = require('./components/header/Header');
const Card = require('./components/card/Card');

class App extends React.Component {
  // Should initialize state in constructor instead of getInitialState when using ES6 Classes
  constructor(props) {
    super(props);
    // Locally defined state
    this.state = {
      navbar: [
        {
          text: 'Home',
          url: '#'
        },
        {
          text: 'About',
          url: '#'
        },
        {
          text: 'Contact us',
          url: '#'
        }
      ],
      isLoading: true
    };
  }

  componentWillMount() {
    this.setState({ isLoading: true });
  }

  componentDidMount() {
    this.setState({ isLoading: false });
    fetch('https://api.coinmarketcap.com/v1/ticker/?limit=15')
      .then(results => results.json())
      .then(data => {
        console.log(data);
        const cryptoData = data.map((crypto, index) => {
          return (
            <Card key={index} title={`${crypto.name} (${crypto.symbol})`}>
              <section>
                {`Rank: ${crypto.rank}`}
                <br />
                {`Price: $${crypto.price_usd}`}
                <br />
                {`Price to BTC: ${crypto.price_btc}`}
                <br />
                {`Change 1h: ${crypto.percent_change_1h > 0 ? '\u2191' : '\u2193'} ${crypto.percent_change_1h}%`}
                <br />
                {`Change 24h: ${crypto.percent_change_24h > 0 ? '\u2191' : '\u2193'} ${crypto.percent_change_24h}%`}
                <br />
                {`Change 7d: ${crypto.percent_change_7d > 0 ? '\u2191' : '\u2193'} ${crypto.percent_change_7d}%`}
                <hr />
                {`Last Updated: ${this.formatTime(crypto.last_updated)}`}
              </section>
            </Card>
          );
        });

        this.setState({
          cryptoData
        });
      });
  }

  formatTime(unix_timestamp) {
    const date = new Date(unix_timestamp * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();
    return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  }

  render() {
    return this.state.isLoading ?
      (
        <div>
          <h1>Loading...</h1>
        </div>
      )
      : (
        <div>
          <div id='menu'>
            <Navbar items={this.state.navbar} />
          </div>
          <Header text='Sizzto' subheader='Crypto-Currency Info' />
          <div id='card-list'>
            {this.state.cryptoData}
          </div>
        </div>
      )
  }
}
module.exports = App;
const React = require('react');

// Components
const Card = require('../card/Card');
const ScrollToTop = require('../scrollToTop/ScrollToTop');

class InfiniteScroll extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      start: 0,
      limit: 30,
      yOffset: 0
    };

    this.listenScrollEvent = this.listenScrollEvent.bind(this);
  }

  componentDidMount() {
    this.fetchData();
    window.addEventListener('scroll', this.listenScrollEvent);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.listenScrollEvent);
  }

  listenScrollEvent() {
    this.setState({
      yOffset: window.pageYOffset
    })
    if (window.pageYOffset >= (document.body.scrollHeight - document.body.clientHeight - 1) && !this.state.isLoading) {
      this.setState({
        start: this.state.start + this.state.limit,

      });
      this.fetchData();
    }
  }

  fetchData() {
    fetch(`https://api.coinmarketcap.com/v2/ticker/?start=${this.state.start}&limit=${this.state.limit}`)
      .then(results => results.json())
      .then(result => {
        const { data } = result;
        return Object.keys(data).sort((key2, key1) => data[key2].rank - data[key1].rank).map((key) => {
          return (
            <Card key={key + this.state.start} title={`${data[key].name} (${data[key].symbol})`}>
              <section>
                {`Rank: ${data[key].rank}`}
                <br />
                {`Price: $${data[key].quotes['USD'].price}`}
                <br />
                {`Change 1h: ${data[key].quotes['USD'].percent_change_1h > 0 ? '\u2191' : '\u2193'} ${data[key].quotes['USD'].percent_change_1h}%`}
                <br />
                {`Change 24h: ${data[key].quotes['USD'].percent_change_24h > 0 ? '\u2191' : '\u2193'} ${data[key].quotes['USD'].percent_change_24h}%`}
                <br />
                {`Change 7d: ${data[key].quotes['USD'].percent_change_7d > 0 ? '\u2191' : '\u2193'} ${data[key].quotes['USD'].percent_change_7d}%`}
                <hr />
                {`Last Updated: ${this.formatTime(data[key].last_updated)}`}
              </section>
            </Card>
          );
        })
      })
      .then((cryptoData) => {
        this.setState({
          isLoading: false,
          cryptoData: this.state.cryptoData ? this.state.cryptoData.concat(cryptoData) : cryptoData
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
    return (
      <div className={classnames('card-list')} ref='iScroll' >
        {this.state.cryptoData}
        {this.state.yOffset >= 50 ? <ScrollToTop scrollStepInPx={window.pageYOffset / 12} delayInMs="12"/> : null}
        {this.state.isLoading ? <p>Loading...</p> : ''}
      </div >
    );
  }

}
module.exports = InfiniteScroll;
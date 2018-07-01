const React = require('react');

// Components
const Header = require('../components/header/Header');
const InfiniteScroll = require('../components/infinite-scroll/InfiniteScroll');

class Home extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Header text='Sizzto' subheader='Crypto-Currency Info' />
        <InfiniteScroll />
      </React.Fragment>
    );
  }

}
module.exports = Home;
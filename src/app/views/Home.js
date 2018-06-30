const React = require('react');

// Components
const Header = require('../components/header/Header');
const InfiniteScroll = require('../components/infinite-scroll/InfiniteScroll');

class Home extends React.Component {

  render() {
    return (
      <div>
        <Header text='Sizzto' subheader='Crypto-Currency Info' />
        <InfiniteScroll />
      </div>
    );
  }

}
module.exports = Home;
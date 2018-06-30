const React = require('react');

// Components
const HeaderBackground = require('./HeaderBackground');
const HeaderTitle = require('./HeaderTitle');

class Header extends React.Component {

  render() {
    return (
      <div id='header'>
        <HeaderBackground src={this.props.src} />
        <HeaderTitle text={this.props.text} subheader={this.props.subheader} />
      </div>
    )
  }

}
module.exports = Header;
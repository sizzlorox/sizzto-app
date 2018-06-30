const React = require('react');

// Components
const CardImage = require('./CardImage');
const CardBody = require('./CardBody');

class Card extends React.Component {

  render() {
    return (
      <div id='card'>
        <CardImage />
        <CardBody title={this.props.title}>
          {this.props.children}
        </CardBody>
      </div>
    );
  }

}
module.exports = Card;
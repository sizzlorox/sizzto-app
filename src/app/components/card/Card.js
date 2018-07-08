const React = require('react');

// Components
const CardBody = require('./CardBody');

class Card extends React.Component {

  render() {
    return (
      <div className={classnames('card')}>
        <CardBody title={this.props.title} src={this.props.src}>
          {this.props.children}
        </CardBody>
      </div>
    );
  }

}
module.exports = Card;
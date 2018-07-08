const React = require('react');

// Components
const CardImage = require('./CardImage');

class CardBody extends React.Component {

  render() {
    return (
      <div className={classnames('card-body')}>
        {this.props.src ? <CardImage src={this.props.src} /> : ''}
        <h3>{this.props.title}</h3>
        <hr />
        {this.props.children}
      </div>
    );
  }

}
module.exports = CardBody;
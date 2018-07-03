const React = require('react');

class CardBody extends React.Component {

  render() {
    return (
      <div className={classnames('card-body')}>
        <h3>{this.props.title}</h3>
        <hr/>
        {this.props.children}
      </div>
    );
  }

}
module.exports = CardBody;
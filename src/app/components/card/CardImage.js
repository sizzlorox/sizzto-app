const React = require('react');

class CardImage extends React.Component {

  render() {
    return (
      <img className={classnames('card-image')} src={this.props.src}/>
    );
  }

}
module.exports = CardImage;
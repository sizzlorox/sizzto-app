const React = require('react');

class Modal extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const showHideClassName = this.props.show ? 'modal display-block' : 'modal display-none';

    return (
      <div className={classnames(showHideClassName)}>
        <section className={classnames('modal-main')}>
          {this.props.children}
          <button onClick={this.props.handleClose}>close</button>
        </section>
      </div>
    );
  };
}
module.exports = Modal;
const React = require('react');
const { FontAwesomeIcon } = require('@fortawesome/react-fontawesome');

class ScrollToTop extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      intervalId: 0
    };

    this.scrollToTop = this.scrollToTop.bind(this);
  }

  scrollStep() {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }

  scrollToTop() {
    let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
    this.setState({ intervalId: intervalId });
  }

  render() {
    return (
      <button className={classnames('scroll-top')} onClick={this.scrollToTop}>
        <span className={classnames('arrow-up')}>
          <FontAwesomeIcon icon='angle-up' />
        </span>
      </button>
    );
  }

}
module.exports = ScrollToTop;
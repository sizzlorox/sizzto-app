const React = require('react');
const withRouter = require('react-router-dom');

class NotFound extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.history.push('/');
  }

  render() {
    return (
      <React.Fragment>
        <div className={classnames('not-found')}>
          <h1>Uh oh! Something has gone wrong!</h1>
          <p>Error 404: Page not found!</p>
          <button className={classnames('submit')} type='button' onClick={this.onClick}>
            Back Home
          </button>
        </div>
      </React.Fragment>
    );
  }

}
module.exports = NotFound;
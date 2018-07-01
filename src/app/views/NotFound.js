const React = require('react');

class NotFound extends React.Component {

  render() {
    return (
      <React.Fragment>
        <h1>Uh oh! Something has gone wrong!</h1>
        <p>Error 404: Page not found!</p>
      </React.Fragment>
    );
  }

}
module.exports = NotFound;
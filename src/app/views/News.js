const React = require('react');

class News extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'Still developing this part!',
      rssFeed: process.env.NODE_ENV.includes('production')
        ? 'http://cryptscout.com/cryptocurrency-news-rss.php'
        : 'https://cors-anywhere.herokuapp.com/http://cryptscout.com/cryptocurrency-news-rss.php'
    };
  }

  componentDidMount() {
    this.getFeed();
  }

  getFeed() {
  }

  render() {
    return (
      <React.Fragment>
        <h1>{this.state.title}</h1>
        {this.state.entries ? this.state.entries.map((entry, index) => {
          return (
            <React.Fragment key={index}>
              {entry.content}
            </React.Fragment>
          );
        }) : ''}
      </React.Fragment>
    );
  }

}
module.exports = News;
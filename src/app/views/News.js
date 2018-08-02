const React = require('react');
const Parser = require('rss-parser');
const parser = new Parser();

class News extends React.Component {

  constructor(props) {
    super(props);
    // TODO: fix rssFeed when removing out of netlify
    this.state = {
      isLoading: false,
      title: 'Crypto-News (No styling yet)',
      rssFeed: process.env.NODE_ENV.includes('production')
        ? process.env.NODE_ENV.includes('netlify') ? 'https://cors-anywhere.herokuapp.com/http://cryptscout.com/cryptocurrency-news-rss.php'
          : '//cryptscout.com/cryptocurrency-news-rss.php'
        : 'https://cors-anywhere.herokuapp.com/http://cryptscout.com/cryptocurrency-news-rss.php'
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    });
    this.getFeed();
  }

  async getFeed() {
    const feed = await parser.parseURL(this.state.rssFeed);
    this.setState({
      items: feed.items,
      isLoading: false
    });
  }

  render() {
    return this.state.isLoading ?
      <React.Fragment>
        <p>Loading...</p>
      </React.Fragment>
      : (
        <React.Fragment>
          <h1>{this.state.title}</h1>
          {this.state.items ? this.state.items.map((entry, index) => {
            return (
              <div key={index}>
                <h4>{entry.title}</h4>
                <p>{entry.contentSnippet}</p>
                <a href={entry.link}>Link</a>
              </div>
            );
          }) : ''}
        </React.Fragment>
      );
  }

}
module.exports = News;
const React = require('react');

// Utils
const { runescapeItemDB } = require('../utils/enumHelper');
const { arrayMovePos } = require('../utils/helper');

// Components
const Card = require('../components/card/Card');

class Runescape extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      api: process.env.NODE_ENV.includes('production')
        ? 'https://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item='
        : 'https://cors-anywhere.herokuapp.com/https://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item='
    };

    this.handleItemChange = this.handleItemChange.bind(this);
  }

  handleItemChange(event) {
    if (!event.target.value.includes('None')) {
      const item = runescapeItemDB.find(item => item.id = event.target.value);
      this.fetchData(item);
    }
  }

  fetchData(itemObj) {
    fetch(this.state.api.concat(itemObj.id))
      .then(results => results.json())
      .then(result => {
        const { item } = result;
        return (
          <Card title={item.members ? item.name : `${item.name} (Members)`} src={item.icon_large} >
            <div>
              <section className={classnames('description')}>
                {item.description}
              </section>
              <section className={classnames('prices')}>
                <Card title={'Details'}>
                  {`Today: ${item.today.trend.includes('positive') ? '\u2191' : '\u2193'} ${item.today.price}gp`}
                  <br />
                  {`Current: ${item.current.trend.includes('positive') ? '\u2191' : '\u2193'} ${item.current.price}gp`}
                  <br />
                  {`30 Days: ${item.day30.trend.includes('positive') ? '\u2191' : '\u2193'} ${item.day30.change}`}
                  <br />
                  {`90 Days: ${item.day90.trend.includes('positive') ? '\u2191' : '\u2193'} ${item.day90.change}`}
                  <br />
                  {`180 Days: ${item.day180.trend.includes('positive') ? '\u2191' : '\u2193'} ${item.day180.change}`}
                </Card>
              </section>
            </div>
          </Card>
        );
      })
      .then((itemData) => {
        this.setState({
          isLoading: false,
          itemData
        });
      });
  }

  render() {
    return (
      <React.Fragment>
        Search Item: <select name='item' onChange={this.handleItemChange}>
          <option value={null}>None</option>
          {runescapeItemDB.map((item, index) => {
            return <option key={index} value={item.id}>{item.name}</option>;
          })}
        </select>
        {this.state.itemData}
      </React.Fragment>
    );
  }

}
module.exports = Runescape;

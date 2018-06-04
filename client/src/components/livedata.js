//https://www.codeproject.com/Tips/1215984/Update-State-of-a-Component-from-Another-in-React
//https://www.npmjs.com/package/better-react-spinkit
//https://medium.com/@ruthmpardee/passing-data-between-react-components-103ad82ebd17
import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';

//import { render } from "react-dom";
const Spinner = require("react-spinner");

// const styles = {
//   fontFamily: "sans-serif",
//   textAlign: "center"
// };

class StockChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      error: null,
      ticker: this.props.ticker,
      currentprice: null,
      previous_close: this.props.previous_close
      //currency
      //datetime
      //
    };
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData(this.state.ticker);
  }

  getData(ticker) {
    console.log("GETdata " + ticker);
    let rows = [];
    let currentprice = null;

    //TODO: move up fetch to container to use current price in the table
    fetch(
      "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" +
        ticker +
        "&interval=1min&apikey="
    )
      .then(response => response.json())
      .then(data => {
        data = data["Time Series (1min)"];
        for (var key in data) {
          currentprice = data[key]["4. close"];
          break;
        }
        console.log("currentprice: " + currentprice);

        this.setState({ rows: rows, error: false, currentprice: currentprice });
      })
      .catch(error => {
        this.setState({ error: true });
        console.log(error.message);
      });
  }

  render() {
    let change = this.round(
      (this.state.currentprice / this.state.previous_close - 1) * 100,
      2
    );
    if (change > 0) {
      change = "+" + change + "%";
    } else {
      change = change + "%";
    }
    if (this.state.error === false) {
      return (
        <div>
          <h2> {this.state.ticker} {this.round(this.state.currentprice, 2)} {change}</h2>
        </div>
      );
    } else if (this.state.error === true) {
      return (
        <p>
          There was an error getting the chart data from the api. Try again
          later
        </p>
      );
    } else {
      console.log("spinner");
      return (
        <div>
          <CircularProgress  />
        </div>
      );
    }
  }
  componentDidCatch(error, info) {
    //can remove with state
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    console.log(error, info);
  }
  round(number, precision) {
    var shift = function(number, exponent) {
      var numArray = ("" + number).split("e");
      return +(numArray[0] +"e" +(numArray[1] ? +numArray[1] + exponent : exponent));
    };
    return shift(Math.round(shift(number, +precision)), -precision);
  }
}

export default StockChart;

//https://material-ui.com/demos/lists/
//https://material-ui.com/layout/grid/
import React from "react";
import Chart from "./chart";
import LiveData from "./livedata";
import CircularProgress from "@material-ui/core/CircularProgress";
import Shares from "./shares-table";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

class StockContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: this.props.ticker,
      rows: false,
      previous_close: null,
      error:true// TODO: unused
    };
    this.getData = this.getData.bind(this);
  }

  componentWillMount() {
    this.getData(this.state.ticker);
  }

  getData(ticker) {
    console.log("GETdata " + ticker);
    let rows = [];
    let previousclose = null;
    fetch(
      "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" +
        ticker +
        "&apikey="
    )
      .then(response => response.json())
      .then(data => {
        data = data["Time Series (Daily)"];
        let i = 0;
        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            rows.push([new Date(key), Number(data[key]["4. close"])]);
          }
          if (i === 1) {
            previousclose = data[key]["4. close"];
          }
          i++;
        }
        console.log(rows[1]);
        console.log(typeof rows);
        this.setState({
          rows: rows,
          error: false,
          previous_close: previousclose
        });
      })
      .catch(error => {
        this.setState({ error: true });
        console.log(error.message);
      });
  }

  render() {
    if (!this.state.rows) {
      return (
        <div>
          <h2> {this.state.ticker} </h2>
          <CircularProgress size={50} />
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <Grid container spacing={24}>
              <Grid item xs={5}>
                <Paper>
                  <LiveData
                    ticker={this.state.ticker}
                    previous_close={this.state.previous_close}
                  />
                </Paper>
                <Paper>
                  <Shares propsdata="iTS ALIVE"/>
                </Paper>
              </Grid>
              <Grid item xs={7}>
                <Paper>
                  <Chart ticker={this.state.ticker} rows={this.state.rows} />
                </Paper>
              </Grid>
            </Grid>
          </div>
        </div>
      );
    }
  }
}

export default StockContainer;

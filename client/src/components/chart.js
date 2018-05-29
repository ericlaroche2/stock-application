//https://www.codeproject.com/Tips/1215984/Update-State-of-a-Component-from-Another-in-React
//https://www.npmjs.com/package/better-react-spinkit
//https://medium.com/@ruthmpardee/passing-data-between-react-components-103ad82ebd17
import React from "react";
import { render } from "react-dom";
import Tickerfield from "./tickerfield";
import { Chart } from "react-google-charts";
const Spinner = require("react-spinner");
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};


class StockChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        title: "Age vs. Weight comparison",
        hAxis: { title: "Date", format: 'dd-MM-yy' },
        vAxis: { title: "USD" },
        legend: "none"
      },
      rows: [],
      columns: [
        {
          type: "date",
          label: "Date"
        },
        {
          type: "number",
          label: "Weight"
        }
      ],
      error: null,
    };
    this.getData = this.getData.bind(this);

  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    let rows = this.state.rows;
    fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo")
      .then(response => response.json())
      .then((data) => {
        let count = 0;
        data = (data["Time Series (Daily)"]);
        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            //console.log(key + " -> " + data[key]["4. close"]);
            let split = key.split("-");
            rows.push([new Date(key), Number(data[key]["4. close"])]);
            // console.log(rows[count++]);
          }
        }
        this.setState({ rows: rows, error: false });
      }).catch(error => this.setState({ error: true }));

  }
  render() {
    if (this.state.error === false) {
      return (
        <Chart
          chartType="AnnotationChart"
          rows={this.state.rows}
          columns={this.state.columns}
          options={this.state.options}
          graph_id="annotationchart"
          width={"100%"}
          height={"400px"}
          legend_toggle
        />
      );
    } else if (this.state.error === true) {
      return (
        <p>There was an error getting the chart data from the server. Try asgain later</p>
      );
    } else {
      return (
        <div><Spinner /></div>
      );
    }
  }
  componentDidCatch(error, info) { //can remove with state
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    console.log(error, info);
  }
}

export default StockChart;

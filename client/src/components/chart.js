//https://codepen.io/Shamiul_Hoque/pen/LNavdZ LISTVIEW
//https://www.codeproject.com/Tips/1215984/Update-State-of-a-Component-from-Another-in-React
//https://www.npmjs.com/package/better-react-spinkit
//https://medium.com/@ruthmpardee/passing-data-between-react-components-103ad82ebd17


import React from "react";
//import { render } from "react-dom";
import CircularProgress from '@material-ui/core/CircularProgress';

import { Chart } from "react-google-charts";
const Spinner = require("react-spinner");

// const styles = {
//   fontFamily: "sans-serif",
//   textAlign: "center"
// };

class StockChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        title: "Age vs. Weight comparison",
        hAxis: { title: "Date", format: "dd-MM-yy" },
        vAxis: { title: "USD" },
        legend: "none",
        animation: {
          duration: 1500,
          startup: true //This is the new option
        }
      },
      rows: this.props.rows,
      columns: [
        {
          type: "date",
          label: "Date"
        },
        {
          type: "number",
          label: "$"
        }
      ],
      error: false,
      ticker: this.props.ticker
    };
  }
  componentWillMount() {
    console.log("chart: " + this.state.ticker);
  }

  componentWillReceiveProps() {
    this.setState({ rows: this.props.rows });
  }

  render() {
    if (this.state.error === false) {
      console.log("rendering chart: " + this.props.ticker);
      return (
        <Chart
          chartType="AnnotationChart"
          rows={this.state.rows}
          columns={this.state.columns}
          options={this.state.options}
          graph_id={this.state.ticker}
          width={"100%"}
          height={"300px"}
          legend_toggle
        />
      );
    } else if (this.state.error === true) {
      return (
        <p>
          There was an error getting the chart data from the server. Try again
          later
        </p>
      );
    } else {
      console.log("circularprog");
      return (
          <Chart
            chartType="AnnotationChart"
            columns={this.state.columns}
            options={this.state.options}
            graph_id={this.state.ticker}
            animation={this.state.animation}
            width={"100%"}
            height={"300px"}
            legend_toggle
          />
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
}

export default StockChart;

import React from "react";
import Chart from "./chart";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class Tickerfield extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", ticker: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
    console.log("submit: " + this.state.value);
    this.setState({ ticker: this.state.value });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Ticker symbol:
            <input
              type="text"
              name="name"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <Chart ticker={this.state.ticker} />
      </div>
    );
  }
}
export default Tickerfield;

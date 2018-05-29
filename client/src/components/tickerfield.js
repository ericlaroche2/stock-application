import React from "react";
import { render } from "react-dom";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class Tickerfield extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
    this.updateTicker(this.state.value);
    event.preventDefault();
  }

  updateTicker(text) {
    this.setState({ text })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Ticker symbol:
<input type="text" name="name" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default Tickerfield;

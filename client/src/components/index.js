import React from "react";
import { render } from "react-dom";
import Tickerfield from "./tickerfield";
import StockContainer from "./stockcontainer";
import CommentsList from "./comment";
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const App = () => (
  <div style={styles}>
    <h1>Sandbox</h1>
    <StockContainer ticker="AMZN" />
    <StockContainer ticker="GOOG" />
    <CommentsList/>
  </div>
);
export default App;

//TODO: modal to add shares bought
//
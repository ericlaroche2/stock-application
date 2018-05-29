import React, { Component } from 'react';
import './customers.css';
import { Chart } from 'react-google-charts';
import {GoogleCharts} from 'google-charts';
/*global google*/
class Customers extends Component {
  constructor() {
    super();
    this.state = {
      customers: [],
      json: [],
      chart:[]
    };



  }

  componentDidMount() {
    // fetch('/api/customers')
    //   .then(res => res.json())
    //   .then(customers => this.setState({customers}, () => console.log('Customers fetched...', customers)));



    fetch('/api/stock')
      .then(res => res.json(), () =>console.log('this is in api'))
      .then(json => this.setState({ json }));

   // GoogleCharts.load(this.drawChart(this.json));

  }
  componentWillReceiveProps() {
    GoogleCharts.load(this.drawChart(this.json));
  }
  render() {
    return (
      <div>
        <h2>Customers</h2>
        <div>{this.state.chart}</div>
        <ul>
          {
            //this.state.customers.map(customer =>
          //<li key={customer.id}>{customer.firstName} {customer.lastName}</li>
          //)
        }
          <li> {
           // this.state.json
          }</li>
        </ul>
      </div>
    );
  }



  drawChart(data) {

    //data is the JSON string
    //console.log(data);
    var timeseries=data["Time Series (Daily)"]

    var graphtable = new google.visualization.DataTable();
    graphtable.addColumn('date', 'Date');
    graphtable.addColumn('number', 'Stock price');
    graphtable.addColumn('string', 'title1');
    graphtable.addColumn('string', 'text1');
    var rows=[];

    for (var key in timeseries) {
        if (timeseries.hasOwnProperty(key)) {
          //  console.log(key + " -> " + timeseries[key]["4. close"]);
            var date = new Date(key);
            rows.push([date, Number(timeseries[key]["4. close"]),undefined, undefined ])

        }
    }
    graphtable.addRows(rows);

    var chart = new google.visualization.AnnotatedTimeLine(document.getElementById('chart_div'));
  //  document.getElementById("stockname").innerHTML = ticker_symbol;
    return chart.draw(graphtable, {displayAnnotations: true});


  }



}

export default Customers;

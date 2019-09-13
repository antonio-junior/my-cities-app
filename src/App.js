import React, { Component } from 'react';
import './App.css';
import './custom.css';

import AutoComplete from './AutoComplete'
import Content from './Content'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = { cities: [] }
    this.onClickSuggestion = this.onClickSuggestion.bind(this)
    this.onClickRemove = this.onClickRemove.bind(this)
  }
  render() {
    return(
      <div className="App">
        <h1>Weather App</h1>
        <AutoComplete onClickSuggestion={this.onClickSuggestion} />
        <Content cities={this.state.cities} onClickRemove={this.onClickRemove}/>
      </div>
    )
  }

    onClickSuggestion (city) {
      this.setState({ cities: this.state.cities.concat(city)})
    }

    onClickRemove (city) {
      this.setState({ cities: this.state.cities.filter(x => x.id !== city.id)})
    }
}
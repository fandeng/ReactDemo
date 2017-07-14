'use strict';
import React, { Component } from 'react';
import App from './containers/app';
import store from './store/store';
import {Provider} from 'react-redux';
import {
  AppRegistry,
} from 'react-native';

export default class Root extends Component {
  constructor(props){
    super(props);
    console.disableYellowBox = true;
  }
  render() {
    return (
      <Provider store = {store}>
        <App/>
      </Provider>
    )
  }
}

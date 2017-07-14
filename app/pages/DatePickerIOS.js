'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  DatePickerIOS
} from 'react-native';

import Common from '../common/common';
import HeaderView from '../common/HeaderView';


export default class DatePickerIOSStyle extends Component {
  render() {
    return (
      <View>
      <HeaderView  titleView= {'日期选择器'}
        leftIcon={'angle-left'}
        leftIconAction={() => this.props.navigator.pop() }/>
      {
        <View>
          <DatePickerIOS
            date = { new Date()}
            mode = "date"
          />

        </View>
     }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  datePickerContainer: {
    flex: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 10,
  },
});

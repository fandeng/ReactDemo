//按钮点击
'use strict';
import React, {
    Component
} from 'react';

import  {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableHighlight,
  ToastAndroid,
} from 'react-native';
import Common from '../common/common';
import HeaderView from '../common/HeaderView';
import { toastShort } from '../utils/ToastUtil';
var styles = require('../style/style');

class MoreCustomButton extends React.Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.nextContainer_style}
        underlayColor="aqua"
        onPress={this.props.onPress}>
        <Text>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}
export default class ButtonStyleFD extends Component {
  render() {
    return (
      <View>
       <HeaderView  titleView= {'提示框实例'}
         leftIcon={'angle-left'}
         leftIconAction={() => this.props.navigator.pop() }
       />
       <MoreCustomButton onPress={() => {toastShort('你点击了我了~好疼！')}} text='请点击我~'/>
      </View>
    );
  }
}

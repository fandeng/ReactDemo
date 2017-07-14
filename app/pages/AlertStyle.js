//提示框
'use strict';
import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    Alert,
    Platform,
    ToastAndroid,
    TouchableHighlight,
} from 'react-native';

import Common from '../common/common';
import HeaderView from '../common/HeaderView';
import { toastShort } from '../utils/ToastUtil';

class CustomButton extends React.Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor="#a5a5a5"
        onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}
export default class AlertStyleFD extends Component {
  render() {
      return(
         <View>
          <HeaderView  titleView= {'提示框实例'}
          leftIcon={'angle-left'}
          leftIconAction={() => this.props.navigator.pop() }/>
          {
            <ScrollView style = {{width:Common.window.width,height:Common.window.height-64}}>
              <CustomButton text='点击弹出默认Alert' onPress={()=>Alert.alert('温馨提醒','想点我吗？')} />

              <CustomButton text='点击弹出两个按钮的Alert'
                    onPress={()=>Alert.alert('温馨提醒','想点我吗？',[
                      {text:'取消',onPress:()=>toastShort('点击了取消')},
                      {text:'确定',onPress:()=>toastShort('点击了确定')}
              ])}/>

              <CustomButton text='点击弹出三个按钮的Alert'
                onPress={()=>Alert.alert('温馨提醒','确定退出吗?',[
                  {text:'稍候再说',onPress:()=>toastShort('点击了稍候再说')},
                  {text:'确定',onPress:()=>Platform.OS == 'ios'? this.props.navigator.pop():ToastAndroid.show('你点击了取消！', ToastAndroid.SHORT)},
                  {text:'取消',onPress:()=>Platform.OS == 'ios'? toastShort('点击了取消'):this.props.navigator.pop()}
                  ])} />

            </ScrollView>
          }
         </View>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    margin:5,
    backgroundColor: 'darkgray',
    padding: 15,
    borderRadius:5,
  }
});

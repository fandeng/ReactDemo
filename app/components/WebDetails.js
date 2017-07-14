//web网页界面
'use strict';
import React, { Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  WebView,
  BackAndroid
} from 'react-native';
import Common from '../common/common';
import HeaderView from '../common/HeaderView';

let canGoBack = false;
class WebViewDetails extends Component {
  constructor(props) {
	  super(props);
	  this.state = {
	  	info:this.props.info,
	  };
	}
  componentDidMount(){
		 BackAndroid.addEventListener('hardwareBackPress', () => {
    		this.props.navigator.pop()
     		return true
		});
	}
  render() {
      return (
        <View style={{flex:1}}>
          <HeaderView  titleView= {'详情'}
            leftIcon={'angle-left'}
            leftIconAction={() => this.props.navigator.pop()}
          />
            <WebView style={styles.webview_style}
              source={{uri: this.props.info}}
              startInLoadingState={true}
              javaScriptEnabled={true}>
            </WebView>
        </View>
    );
  }
}
const styles = StyleSheet.create({
    webview_style:{
      width:Common.window.width,
      height:Common.window.height-64,
      backgroundColor:'#f0f1f2'
    },
});
module.exports = WebViewDetails;

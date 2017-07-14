//广告小图
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    Platform,
} from 'react-native';

import Common from '../common/common';


export default class AdvertSmallCell extends Component{
  constructor(props) {
      super(props);
  }
  render() {
    const data = this.props.data;
    return (
      <View style = {styles.container}>

        <Image style = {styles.image_style} source = {{uri:data.cover}}/>

        <View style={{height:10,width:Common.window.width,backgroundColor:'#f0f1f2'}}/>
      </View>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    marginTop:15,
    width: Common.window.width,
    height:90
  },
  image_style:{
    width:Common.window.width,
    height:80
  },
});

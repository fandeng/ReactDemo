//查看大图
'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
} from 'react-native';

import Common from '../common/common';

class LookBigImage extends Component {
  constructor(props) {
	  super(props);
	  this.state = {
	  	imgurl:this.props.imgurl,
	  };
	}
  render() {
    return (
        <View >
            <TouchableOpacity  activeOpacity={0.75}  onPress={()=>this.props.navigator.pop()} >
              <View style={styles.view_style}>
                  <Image source={{uri:this.state.imgurl}} style={styles.img_style}/>
              </View>
            </TouchableOpacity>
        </View>
    );
  }
}
const styles = StyleSheet.create({
    view_style:{
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'black',
      width: Common.window.width,
      height: Common.window.height
    },
    img_style:{
      width: Common.window.width,
      height: Common.window.height,
      resizeMode:'contain'
    }
});
module.exports = LookBigImage;

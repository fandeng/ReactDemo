//样式8 文章样式--->大图加文章
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    Platform,
} from 'react-native';

import Common from '../common/common';
import Style from '../style/style';

export default class ArticleCell extends Component{
  constructor(props) {
      super(props);
  }
  render() {
    const data = this.props.data;
    return (
      <View style = {styles.container}>
          <Image style = {styles.image_style} source = {{uri:data.cover}}>
            <View style={styles.view_style}>
              <Text style = {[Style.mainBody,styles.text_style]} numberOfLines={1}>
              10月份秋高气爽，是旅游的黄金季节，炎热的酷暑正在逐渐消退，秋日的美景正在祖国大地上悄然出现，五彩斑斓，令人遐想。金黄的胡杨，火红的枫叶
              </Text>
            </View>
          </Image>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    width: Common.window.width,
    height:190,
    marginTop:15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image_style:{
    width:Common.window.width-30,
    height:180,
    justifyContent: 'flex-end'
  },
  text_style:{
    width: Common.window.width-50,
    color:'white',
    fontSize:18,
    marginLeft:10
  },
  view_style:{
    width: Common.window.width-30,
    height:40,
    justifyContent: 'center',
    backgroundColor:'rgba(0, 0, 0, 0.3)'
  },
});

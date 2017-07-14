//咨讯--cell(item)：每一条样式
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    View,
    Platform,
} from 'react-native';

import Common from '../common/common';
import Style from '../style/style';

export default class NewsCell extends Component {
  constructor(props) {
      super(props);
  }
  render() {
    const data = this.props.data;

    return (
      <View style = {styles.container}>
        <View style = {{width:Common.window.width-130,marginLeft:15}}>
          <Text style = {[Style.mainBody,{width:Common.window.width-130,marginTop:15,fontSize:15}]} numberOfLines={2}>健身指南</Text>
          <View style = {styles.view_style}>
            <Text style = {[Style.subtitle,{width:100}]} numberOfLines={1}>{'作者：无名'}</Text>
            {this.showSourceView('未知')}
          </View>
        </View>
        <Image style={styles.image_right} source = {{uri:data.cover}}/>

      </View>
    );
  }

  showSourceView(sourceValue){
      if (sourceValue) {
        return (
          <View style={styles.image_style}>
            <Text style = {Style.subtitle,styles.source_style} numberOfLines={1}>{sourceValue}</Text>
          </View>
        )
      } else {
        return null;
      }
  }
  showColumnView(column,columnname) {
      if (column) {
        return (
          <View style={styles.column_style}>
            <Text style={{fontSize:12,color:'#C37B2F'}} numberOfLines={1}>{columnname}</Text>
          </View>
        )
      } else {
        return null;
      }
  }
}
const styles = StyleSheet.create({
  container: {
   width: Common.window.width,
   height:90,
   marginTop:15,
   flexDirection: 'row',
   backgroundColor: 'white',
   borderBottomColor: '#E6E6E6',
   borderBottomWidth: 1,
   alignItems:'center'
  },
  view_style:{
    width:Common.window.width-130,
    marginTop:5,
    height:40,
    flexDirection:'row',
    alignItems:'center',
  },
  image_right: {
    height: 60,
    width: 90,
    marginLeft:10,
    resizeMode:'stretch'
  },
  image_style:{
    marginLeft:5,
    height:20,
    borderColor:'#fb0d39',
    borderWidth:0.5,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:5
  },
  source_style:{
    textAlign:'center',
    color:'#fb0d39',
    backgroundColor:'transparent'
  },
  column_style:{
    width:60,
    marginLeft:8,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:5,
    borderColor:'#C37B2F',
    borderWidth:1,
    height:18
  },
});

module.exports = NewsCell;

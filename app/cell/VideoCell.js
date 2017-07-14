//视频--cell(item)：每一条样式
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

export default class VideoCell extends Component {
  constructor(props) {
      super(props);
  }
  render() {
    const data = this.props.data;
    return (
      <View style = {styles.container}>
        <Image style={styles.image_right} source = {{uri:data.cover}}/>
        <View style = {styles.left_view}>
          <View style ={{width:Common.window.width-130,alignItems:'center',flexDirection:'row'}}>
            <Text style = {[Style.mainBody,{width:Common.window.width-180,fontSize:15}]} numberOfLines={2}>健身计划达人</Text>
            <View style={[styles.bgView_style,{backgroundColor:'#f8f8f8'}]}>
              <Text style = {[Style.subtitle,{color:'white',textAlign:'center',fontWeight:'bold'}]} numberOfLines={1}>未播</Text>
            </View>
          </View>
          <View style ={{width:Common.window.width-130,marginTop:20,alignItems:'center',flexDirection:'row'}}>
            <Text style = {[Style.subtitle,{width:100}]} numberOfLines = {1}>
             {'作者:无名'}
            </Text>
            <Text style={[Style.caption,{textAlign:'right',width:Common.window.width-230}]} numberOfLines = {2}>
             今天
            </Text>
          </View>
        </View>
      </View>
    );
  }
  dealWithDate(data){
    if (data.statue=='1') {
      let starttime = data.starttime?data.starttime.slice(0,16):'';
      let endtime = data.endtime?data.endtime.slice(11,16):''
      return starttime+'~'+endtime;
    } else if (data.statue=='2') {
      return '正在直播';
    } else {
      let createtime = data.createtime?data.createtime:'';
      var date= createtime;
      date = new Date(Date.parse(date.replace(/-/g, "/")));
      date = date.getTime();
      var days = Math.round(((new Date()).valueOf() - date)/(24*3600*1000))
      if (days < 1) {
        return '今天';
      } else if (days < 2) {
        return '昨天';
      } else if (days <= 7) {
        return days+'天前';
      } else {
        return createtime.slice(0,10);
      }
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
    alignItems: 'center',
    borderBottomColor: '#E6E6E6',
    borderBottomWidth: 1,
  },
  left_view: {
    width:Common.window.width-130,
    marginLeft:8,
  },
  image_right: {
    height: 60,
    width: 90,
    marginLeft:15,
    resizeMode:'stretch'
  },
  bgView_style:{
    width:50,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:5,
    marginLeft:5,
    height:20
  }
});

module.exports = VideoCell;

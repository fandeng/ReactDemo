//收藏--cell(item)：每一条样式
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    Platform,
    TouchableOpacity,
} from 'react-native';

import Common from '../common/common';
import Style from '../style/style';

export default class CollectCell extends Component {
  constructor(props) {
      super(props);
  }
  render() {
    const data = this.props.data;
    return (
      <TouchableOpacity activeOpacity={0.75} onPress={() => this.props.onPressFeedItem(data.cover)}
        onLongPress={()=>this.props.cancalCollect(data)}
        >
        <View style = {styles.container}>
          <Image style = {[styles.image_right,{marginLeft:0}]} source = {{uri:data.cover}}/>
          <View style = {styles.left_view}>
            <Text style = {[Style.mainBody,{marginTop:5,fontSize:15}]} numberOfLines = {1}>{'营养问答'}</Text>
            <View style ={{marginTop:20,alignItems:'flex-start',flexDirection:'row',justifyContent:'space-between'}}>
              <Text style = {Style.subtitle} numberOfLines = {1}>{'作者：无名'}</Text>
              <Text style = {Style.subtitle}>{''}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  dealWithDate(time){
    var date= time;
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
      return time.slice(0,10);
    }
  }
}
const styles = StyleSheet.create({
  container: {
    width: Common.window.width,
    height:80,
    marginTop:15,
    alignItems:'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomColor:'#E6E6E6',
    borderBottomWidth:1,
  },
  left_view: {
    width:Common.window.width-130,
    height:60,
    marginLeft:10
  },
  image_right: {
    height: 60,
    width: 90,
    marginLeft:15,
    resizeMode:'stretch'
  },
});

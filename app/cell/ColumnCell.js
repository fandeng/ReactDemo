//专栏--cell(item)：每一条样式
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

export default class ColumnCell extends Component {
  constructor(props) {
      super(props);
  }
  render() {
    const data = this.props.data;
    console.log(data.cover);
    return (
      <View style = {styles.container}>
        <Image style={styles.image_right} source = {{uri:data.cover}}/>
        <View style = {styles.left_view}>
          <Text style = {[Style.mainBody,{width:Common.window.width-120,fontSize:15}]} numberOfLines={1}>营养问答</Text>
          <Text style = {[Style.subtitle,{lineHeight:20,width:Common.window.width-120}]} numberOfLines={3}>
          给宝宝制作辅食时，不要添加其他调味料或成分。不要放糖或盐，不要加油脂。不要添加苏打粉，虽然苏打粉可以保持食物色泽，却有损于维生素及矿物质。土豆要连皮一起蒸、烤或放入微波炉中，煮好后再剥皮。最好用蒸、加压或不加水的方法烹煮蔬菜
          </Text>
        </View>
      </View>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    width: Common.window.width,
    marginTop:15,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomColor:'#E6E6E6',
    borderBottomWidth:1
  },
  left_view: {
    width:Common.window.width-120,
    marginLeft:10,
    marginTop:12
  },
  image_right: {
    height: 80,
    width: 80,
    marginLeft:15,
    marginTop:10,
    marginBottom:10,
    resizeMode:'stretch'
  }
});

//标题--cell(item)：每一条样式
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

export default class TitleCell extends Component {
  constructor(props) {
      super(props);
  }
  render() {
    const type = this.props.type;
    return (
      <View style={{backgroundColor:'white'}}>
        {this.differentStyleItem(type)}
      </View>
    );
  }
  //根据传值显示不同样式 style:true表示标题，false表示栏目
  differentStyleItem(style){
     if (style) {
       return (
         <View style={{height:40,alignItems:'center',justifyContent:'center'}}>
            <Text style={[Style.rowTitle,{fontWeight:'bold'}]}>健身指南</Text>
         </View>
       )
     } else {
       return (
         <View>
           {this.showTopSpacingView()}
           <View style={styles.view_style}>
             <View style={{height:30,marginLeft:15,alignItems:'center',marginTop:5,justifyContent:'center'}}>
                <Text style={[Style.rowTitle,{fontWeight:'bold',width:Common.window.width-30-20}]}>
                 <Text style={{fontWeight:'bold',color:'#fe9a14',height:18,fontSize:18}}>{'|'}</Text>
                 {' '+'美味食谱达人'}
                </Text>
             </View>
             <Image style = {styles.image_right} source = {require('../img/listPromte.png')} />
           </View>
         </View>
       )
     }
  }
  showTopSpacingView(){
    if (this.props.data.styleid == '10') {
      return (
        <View style={{height:10,backgroundColor:'#f0f1f2',width:Common.window.width}}/>
      );
    }
  }
}
const styles = StyleSheet.create({
  view_style:{
     width:Common.window.width,
     height:40,
     marginTop:15,
     flexDirection:'row',
     alignItems:'flex-start',
     justifyContent:'space-between',
     backgroundColor:'white',
     borderBottomColor:'#E6E6E6',
     borderBottomWidth:1
  },
  image_right: {
     height: 15,
     width: 8,
     marginRight:15,
     marginTop:25/2-2
  }
});

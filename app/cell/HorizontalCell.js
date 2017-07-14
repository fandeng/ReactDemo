//横向显示
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    ScrollView,
    TouchableOpacity,
    Platform,
} from 'react-native';

import Common from '../common/common';
import Style from '../style/style';

var carouselData = ['https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3591804592,290010643&fm=26&gp=0.jpg',
                    'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1637071672,1647023990&fm=26&gp=0.jpg',
                    'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1647017159,369299238&fm=26&gp=0.jpg',
                    'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1811457400,1412920344&fm=26&gp=0.jpg'
                  ];

export default class HorizontalCell extends Component {
  constructor(props) {
      super(props);
  }
  render() {
    const data = this.props.data;
    return (
      <View style={{marginTop:15}}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{backgroundColor:'white'}}>
         {this.renderItems(carouselData)}
        </ScrollView>
        <View style={{height:10,backgroundColor:'#f0f1f2',width:Common.window.width}}/>
      </View>
    );
  }
  renderItems(data){
    return data.map(function(items,i){
      return (
					<View key={i} style={{width:Common.window.width/3,alignItems:'center',justifyContent:'center'}}>
            <TouchableOpacity activeOpacity={0.75} onPress={()=>this.props.clickVideoAction(items)}>
               <Image style={styles.videoImg_style} source = {{uri:items}}/>

               <Text style = {[Style.mainBody,styles.text_style]} numberOfLines={1}>图片</Text>
            </TouchableOpacity>
					</View>
       )
     }, this);
  }


}
const styles = StyleSheet.create({
  videoImg_style: {
    marginTop:10,
    width: (Common.window.width-100)/3,
    height:(Common.window.width-100)/3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text_style:{
    width: (Common.window.width-100)/3,
    textAlign:'center',
    marginTop:10,
    marginBottom:15
  }
});

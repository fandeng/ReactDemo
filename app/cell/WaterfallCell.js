//瀑布显示
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
                    'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4037836875,1323314356&fm=200&gp=0.jpg',
                    'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2161460663,3544597142&fm=26&gp=0.jpg',
                    'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1811457400,1412920344&fm=26&gp=0.jpg'
                  ];

export default class WaterfallCell extends Component {
  constructor(props) {
      super(props);
  }
  render() {
    return (
      <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={styles.list} style={{backgroundColor:'white',marginTop:15}}>
       {this.renderItems(carouselData)}
      </ScrollView>
    );
  }
  renderItems(data){
    return data.map(function(items,i){
      return (
				<View key={i} style={styles.container}>
          <TouchableOpacity activeOpacity={0.75} onPress={()=>this.props.clickWaterfallAction(items)}>
             <Image style={styles.img_style} source = {{uri:items}}/>
          </TouchableOpacity>
				</View>
       )
     }, this);
  }

}
const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  container: {
    width: Common.window.width / 2,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img_style: {
    width: Common.window.width / 2 - 10,
    height: 100
  },
});

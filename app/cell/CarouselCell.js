//轮播cell
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
import Swiper from 'react-native-swiper';

var carouselData = ['https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3591804592,290010643&fm=26&gp=0.jpg',
                    'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1637071672,1647023990&fm=26&gp=0.jpg',
                    'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1647017159,369299238&fm=26&gp=0.jpg',
                    'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1811457400,1412920344&fm=26&gp=0.jpg'
                  ];

export default class CarouselCell extends Component {
  constructor(props) {
      super(props);
  }
  render() {
    return (
      <View style={styles.view_style}>
        <Swiper height={160}  autoplay={true} activeDotColor={'#ff9a14'} autoplayTimeout={5}>
          {this.renderCarouselPage(carouselData)}
        </Swiper>
      </View>
    );
  }
  //轮播
  renderCarouselPage(data) {
    return data.map(function(items,i){
        return (
  				<View key={i} style={{width:Common.window.width,height:160,alignItems:'center',justifyContent:'center'}}>
            <TouchableOpacity activeOpacity={0.5} onPress={() =>this.props.viewPagerCheck(items)}>
              <Image style = {styles.image_style} source = {{uri:items}}/>
            </TouchableOpacity>
  				</View>
        )
     }, this);
  }


}
const styles = StyleSheet.create({
  view_style:{
    backgroundColor:'white',
    marginTop:15,
    width:Common.window.width,
    height:160
  },
  image_style: {
    width:Common.window.width,
    height:160
  },
});
// var array = [];
// if (items.cover && items.cover != '') {
//   var temp = items.cover;
//   array = temp.split(",");
// }
// let cover = array.length>0?{uri:array[0]}:require('../Resource/public/carousel.png');

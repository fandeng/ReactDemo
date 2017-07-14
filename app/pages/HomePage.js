//首页
'use strict';
import React, { Component} from 'react';
import {
    StyleSheet,
    Text,
    ListView,
    View,
    Image,
    Alert,
    Platform,
    InteractionManager,
    TouchableOpacity,
} from 'react-native';

import Common from '../common/common';
import HeaderView from '../common/HeaderView';

import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import Style from '../style/style';
import Carousel from 'react-native-swiper';
import {toastShort} from '../utils/ToastUtil';
import WebViewDetails from '../components/WebDetails';
import MessageVC from './MessageVC';
import CellStyle from '../cell/CellStyle';
import LookBigImage from '../components/LookBigImage';

var carouselData = ['https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4279488454,2375510965&fm=200&gp=0.jpg',
                    'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=835187673,3615647700&fm=26&gp=0.jpg/',
                    'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1344709775,2643005611&fm=200&gp=0.jpg',
                    'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2261844264,1398222573&fm=26&gp=0.jpg'
                  ];

var data = [
            {"styleid":"5","cover":'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3902436073,1089717092&fm=26&gp=0.jpg'},
            {"styleid":"1","cover":'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2796012437,480169176&fm=26&gp=0.jpg'},
            {"styleid":"2","cover":"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1802555014,204234422&fm=26&gp=0.jpg"},
            {"styleid":"3","cover":"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4279488454,2375510965&fm=200&gp=0.jpg"},
            {"styleid":"4","cover":"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=679805784,3150507797&fm=26&gp=0.jpg"},
            {"styleid":"0","cover":"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3242709860,2221903223&fm=26&gp=0.jpg"},
            {"styleid":"6","cover":"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4196375397,2119005370&fm=26&gp=0.jpg"},
            {"styleid":"7","cover":"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=720985519,3232981341&fm=26&gp=0.jpg"},
            {"styleid":"8","cover":"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3817550882,2423004789&fm=26&gp=0.jpg"},
            {"styleid":"9","cover":"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3028702483,4182396631&fm=26&gp=0.jpg"},
            {"styleid":"10","cover":"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=713059541,2791587689&fm=26&gp=0.jpg"}
           ];

export default class HomePage extends Component {
  constructor(props) {
      super(props);
      this.state = {
        dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        }),
      };
  }
  render() {
      return(
        <View style={{backgroundColor:'#666666'}} >
          <HeaderView  titleView= {'首页'}  rightButton={'home'}
           collectIconAction={()=>this.onClickMessage()}
          />
          <ListView
              dataSource={this.state.dataSource.cloneWithRows(data) }
              renderRow={this.renderRow.bind(this)}
              renderHeader={this.renderHeaderView.bind(this)}
              enableEmptySections={true}
              style={{ height: Common.window.height-64}}//减去导航的高度
          />
        </View>
    );
  }
  renderRow(rowDate,sectionID, rowID){
    return (
      <CellStyle data={rowDate}
       onPressFeedItem ={(data)=>this.onPressFeedItem(data)}
      />
    );
  }
  renderHeaderView(){
    return(
      <View style={{width:Common.window.width,height:280,backgroundColor:'white',marginBottom:10}}>
        {/*标题*/}
        <View style={{marginTop:10,height:40,alignItems:'center',justifyContent:'center'}}>
           <Text style={[Style.rowTitle,{fontWeight:'bold'}]}>轮播图</Text>
        </View>
        {/*轮播图*/}
        <View style={styles.topView_style}>
          <Carousel  height={200} activeDotColor={'#ff9a14'} autoplay={true} autoplayTimeout={3}>
            {this.renderCarouselPage(carouselData)}
          </Carousel>
        </View>
      </View>
    )
  }
  renderCarouselPage(data){
      return data.map(function(items,i){
        return (
  				<View key={i} style={{width:Common.window.width,height:200,alignItems:'center',justifyContent:'center'}}>
            <TouchableOpacity activeOpacity={0.5} onPress={() =>this.clickCarouselAction(items)}>
              <Image style={styles.swiperImage_style} source = {{uri:items}}/>
            </TouchableOpacity>
  				</View>
        );
      }, this);
  }
  //
  clickCarouselAction(item) {
    this.props.navigator.push({
        name: '详情',
        component: WebViewDetails,
        passProps:{
          info:item,
        }
    })
  }
  onClickMessage(){
    this.props.navigator.push({
        name: '详情',
        component: MessageVC
    })
  }
  //
  onPressFeedItem(data) {
    this.props.navigator.push({
       name: '详情',
       component: LookBigImage,
       passProps:{
         imgurl:data
       }
    })
  }
}
const styles = StyleSheet.create({
  topView_style:{
    marginTop:10,
    width:Common.window.width,
    height:220
  },
  swiperImage_style: {
    borderRadius:8,
    height:200,
    width:Common.window.width-40,
    resizeMode:'contain'
  },
});

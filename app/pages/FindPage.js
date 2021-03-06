//发现界面
'use strict';
import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    ListView,
    TouchableOpacity,
    View,
    InteractionManager,
    Dimensions,
    TextInput,
    Platform,
} from 'react-native';

import Common from '../common/common';
import HeaderView from '../common/HeaderView';
import WebViewDetails from '../components/WebDetails'
import Style from '../style/style';
import ResponseData from '../Data/Response.json';
import REQUEST_JSON from '../Data/Request.json';
import {toastShort} from '../utils/ToastUtil';
var DataRepository = require('../Data/DataRepository');
var repository = new DataRepository();
var pageNum = 1;
export default class FindPage extends Component {
  constructor(props) {
      super(props);
      this._renderRow = this.renderRow.bind(this);
      this.state = {
        styleMode:1,
        data:ResponseData.querydiscoveryinfo1.response_body.discoverylist,
        dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        Height: Platform.OS=='ios'?Common.window.height-64-49:Common.window.height-50-49
      };
  }
  componentDidMount(){
    this.request(1);
  }
  render() {
    return (
        <View>
          <HeaderView  titleView= {'发现'} rightButton={'切换'}
           collectIconAction={ this.onClickMessage.bind(this)}
          />
          <ListView
              dataSource={this.state.dataSource.cloneWithRows(this.state.data) }
              renderRow={this._renderRow}
              enableEmptySections={true}
              renderFooter={()=><View style={{height:15}}/>}
              onEndReached={this.loadmore.bind(this,pageNum)}
              initialListSize= {10}
              scrollRenderAheadDistance={50}
              removeClippedSubviews={true}
              style={{height:this.state.Height-(Platform.OS=='ios'?0:20),backgroundColor:'#f0f1f2'}}//减去导航的高度
          />
        </View>
    );
  }
  renderRow(rowDate,sectionID, rowID) {
      return (
        <View style={{marginTop:this.state.styleMode==1?15:0,height:this.state.styleMode == 1?280:80}}>
            {this.hiddenCardView(rowDate)}
        </View>
      );
  }
  hiddenCardView(rowDate) {
    if (this.state.styleMode != 1) {
       return (
         <TouchableOpacity
             activeOpacity={0.75}
             onPress={this._onPressFeedItem.bind(this, rowDate) }
             style={[styles.center,{marginLeft:0,marginRight:0,height:80}]}>
             <View style = {styles.container}>
                 <View style = {styles.left_view}>
                     <Text style = {[Style.mainBody,{marginTop:10,marginLeft: 5,height:20}]} numberOfLines = {1}>{rowDate.title}</Text>
                     <Text style = {[Style.mainBody,{marginTop:5,marginLeft: 5,color: '#666666'}]} numberOfLines = {2}>{rowDate.summary}</Text>
                 </View>
                 <Image style = {styles.image_right} source = {{uri:rowDate.cover}}></Image>
             </View>
         </TouchableOpacity>
       )
    } else {
      return(
        <TouchableOpacity
            activeOpacity={0.75}
            onPress={this._onPressFeedItem.bind(this, rowDate) }
            style={[styles.center,{borderRadius:8,height:280}]}>
             <View style = {{width:Common.window.width-60,marginTop:10}}>
                <Text style = {[Style.rowTitle,{textAlign:'left'}]}>{rowDate.title}</Text>
                <Text style = {[Style.mainBody,{marginTop:5,color:'#666666'}]}>{rowDate.createTime}</Text>
            </View>
            <Image style = {{width:Common.window.width-60,height:150,marginTop:5}} source = {{uri:rowDate.cover}}></Image>
             <View style = {{ width:Common.window.width-60}}>
                <Text style = {[Style.mainBody,{marginTop:10,color: '#666666',marginBottom:10}]} numberOfLines = {2}>
                  {rowDate.summary}
                </Text>
            </View>
        </TouchableOpacity>
      )
    }
  }
  onClickMessage(){
      // alert(this.state.styleMode);
      let mode=this.state.styleMode;
      this.setState({
        styleMode:mode== 1 ? 2:1
      })
      // alert(this.state.styleMode);
  }
  _onPressFeedItem(rowDate, rowID) {
    InteractionManager.runAfterInteractions(() => {
        this.props.navigator.push({
            name: '详情',
            component: WebViewDetails,
            passProps:{
              info:rowDate.serviceurl,
            }
        })
    });
  }
  loadmore(page) {
      if (parseInt(this.state.data.total) > pageNum*this.state.data.length) {
        this.request(page);
      }
  }
  request(p) {
      var querydiscoveryinfo = REQUEST_JSON.querydiscoveryinfo;
      querydiscoveryinfo.userid = '123';
      querydiscoveryinfo.pushpage = '3';
      querydiscoveryinfo.pagenum = p.toString();
      querydiscoveryinfo.pagesize = '20';
      repository.launchRequest('querydiscoveryinfo1',querydiscoveryinfo).then((responseData) => {
          pageNum++;
          // console.log('------->'+pageNum);
          // console.log(responseData.response_body);
          // this.setState({
          //   data:responseData.querydiscoveryinfo.response_body.discoverylist
          // })
      }).done();
  }
}

const styles = StyleSheet.create({
      center:{
         justifyContent: 'center',
         alignItems: 'center',
         backgroundColor:'white',
         marginLeft:15,
         marginRight:15,
      },
      container: {
          width: Common.window.width,
          height:80,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
          borderBottomColor: 'rgba(230.0, 230.0, 230.0, 1.0)',
          borderBottomWidth: 1,
          padding:10,
      },
      left_view: {
        width:Common.window.width-90,
        height:80
      },
      image_right: {
        height: 60,
        width: 60,
        marginLeft: 10,
        marginRight: 10,
        borderRadius:8,
      },
});

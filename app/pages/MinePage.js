'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    ListView,
    ScrollView,
    TouchableOpacity,
    View,
    InteractionManager,
    Dimensions,
    Platform,
    ActionSheetIOS,
    Linking,
    BackAndroid,
} from 'react-native';

import Common from '../common/common';
import HeaderView from '../common/HeaderView';

import MySetting from './MySetting';
import Style from '../style/style';
import {toastShort} from '../utils/ToastUtil';

import ControlFD from './UIControl';
import Interaction from './OCInteractionPage';

import ResponseData from '../Data/Response.json';
import REQUEST_JSON from '../Data/Request.json';
import ChooseRepaymentWay from '../pages/ChooseRepaymentWay';
var DataRepository = require('../Data/DataRepository');
var repository = new DataRepository();

export default class MineContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data:ResponseData.queryuserinfo.response_body,
          loanData:ResponseData.queryloaninfo.response_body
        };
    }
    componentDidMount(){
      this.request();
      this.requestLoaninfo();
    }
    render() {
        return (
          <View style = {{backgroundColor: '#f0f1f2'}}>
            <ScrollView scrollEnabled={false} style = {{width:Common.window.width,height:Common.window.height}}>
               <Image style = {styles.TopView_back} source = {require('../img/minebg.png')}>
                  <View style = {styles.TopImage_back}>
                    <Image style = {styles.TopImage} source = {{uri:'http://112.74.205.50/babylove-web/downfile?fileId=3772'}}/>
                    <TouchableOpacity activeOpacity={0.5}  onPress={()=>this._onCallCustomer()}  style={styles.center}>
                        <View style = {styles.TopCustomer_back}>
                          <Image style = {styles.Customer_Image} source = {require('../img/customer.png')}></Image>
                          <Text style = {[Style.whiteText_style,{width:40,marginTop:5}]}>客服</Text>
                        </View>
                    </TouchableOpacity>
                  </View>
                  <Text style = {[Style.whiteText_style,{marginTop:10, marginLeft:20,width:Common.window.width-40,height:20}]}>{this.state.data.servnum}</Text>
                  <Text style = {[Style.whiteText_style,{marginTop:10, marginLeft:20,width:Common.window.width-40,height:20}]}>{this.state.data.name}</Text>
                  <View style = {styles.TopView_bottom}>
                    <TouchableOpacity  activeOpacity={0.5}  onPress={()=>this._onPressFeedItem('first',ChooseRepaymentWay)}  style={styles.center}>
                      <View style={styles.TopBottom_child}>
                        <Text style={[Style.whiteText_style,{marginTop:10,width:(Common.window.width-20)/2}]}>本期还金额</Text>
                        <Text style={[Style.whiteText_style,{marginTop:10,width:(Common.window.width-20)/2}]}>{this.state.loanData.cur_need_repay}</Text>
                      </View>
                    </TouchableOpacity>

                      <View style={{backgroundColor:'rgba(255.0, 255.0, 255.0, 0.5)',width:1,height:60}}/>
                      <View style={[styles.TopBottom_child,{marginLeft:10}]}>
                        <Text style={[Style.whiteText_style,{marginTop:10,width:(Common.window.width-20)/2}]}>未还总金额</Text>
                        <Text style={[Style.whiteText_style,{marginTop:10,width:(Common.window.width-20)/2}]}>{this.state.loanData.no_repay_totla}</Text>
                      </View>

                      <View style={{backgroundColor:'rgba(255.0, 255.0, 255.0, 0.5)',width:1,height:60}}/>
                      <View style={styles.TopBottom_child}>
                        <Text style={[Style.whiteText_style,{marginTop:10,width:(Common.window.width-20)/2}]}>借款总金额</Text>
                        <Text style={[Style.whiteText_style,{marginTop:10,width:(Common.window.width-20)/2}]}>{this.state.loanData.loan_total}</Text>
                      </View>
                  </View>
               </Image>
               <TouchableOpacity activeOpacity={0.5} onPress={()=>this._onPressFeedItem(null,MySetting)} style={styles.center}>
                   <View style = {styles.Rowcontainer}>
                      <Image style = {styles.RowImage_left} source = {require('../img/setting.png')}></Image>
                      <Text style = {[Style.rowTitle,{textAlign:'left',marginLeft:10,width:Common.window.width-70}]}>设置</Text>
                      <Image style = {styles.RowImage_right} source = {require('../img/listPromte.png')}></Image>
                   </View>
               </TouchableOpacity>
               <TouchableOpacity activeOpacity={0.5} onPress={()=>this._onPressFeedItem(null,Interaction)} style={styles.center}>
                   <View style = {styles.Rowcontainer}>
                      <Image style = {styles.RowImage_left} source = {require('../img/setting.png')}></Image>
                      <Text style = {[Style.rowTitle,{textAlign:'left',marginLeft:10,width:Common.window.width-70}]}>原生交互</Text>
                      <Image style = {styles.RowImage_right} source = {require('../img/listPromte.png')}></Image>
                   </View>
               </TouchableOpacity>
               <TouchableOpacity activeOpacity={0.5} onPress={()=>this._onPressFeedItem(null,ControlFD)} style={styles.center}>
                   <View style = {styles.Rowcontainer}>
                      <Image style = {styles.RowImage_left} source = {require('../img/setting.png')}></Image>
                      <Text style = {[Style.rowTitle,{textAlign:'left',marginLeft:10,width:Common.window.width-70}]}>样式</Text>
                      <Image style = {styles.RowImage_right} source = {require('../img/listPromte.png')}></Image>
                   </View>
               </TouchableOpacity>
            </ScrollView>
          </View>
        );
    }
    onClick(){

    }
    //item点击事件
    _onPressFeedItem(data,vc) {
        InteractionManager.runAfterInteractions(() => {
            this.props.navigator.push({
                name: '下级',
                component: vc,
                passProps:{
                  data:data,
                }
            })
        });
    }
    //客服事件
    _onCallCustomer(){
      Linking.canOpenURL('tel:10000000').then(supported => {
         if (supported) {
            if (Platform.OS === 'ios') {
                ActionSheetIOS.showActionSheetWithOptions({
                  options: ['10000000', '取消'],
                  cancelButtonIndex: 1,
                  tintColor: '#1e90ff',
                },
                (buttonIndex) => {
                  buttonIndex == 0?Linking.openURL('tel:10000000'):null;
                });
            } else {
               Linking.openURL('tel:10000000');
            }
         } else {
           toastShort('未安装电话卡');
         }
      })
    }
    request() {
        var queryuserinfo = REQUEST_JSON.queryuserinfo;
        queryuserinfo.userid = '123';
        repository.launchRequest('queryuserinfo',queryuserinfo).then((responseData) => {

        }).done();
    }
    requestLoaninfo(){
      var queryloaninfo = REQUEST_JSON.queryloaninfo;
      queryloaninfo.userid = '123';
      repository.launchRequest('queryloaninfo',queryloaninfo).then((responseData) => {

      }).done();
    }
}

const styles = StyleSheet.create({
    center:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Rowcontainer: {
      width: Common.window.width,
      height:55,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      borderBottomColor: 'rgba(230.0, 230.0, 230.0, 1.0)',
      borderBottomWidth: 1,
    },
    RowImage_right: {
     height: 15,
     width: 8,
     marginRight: 10,
    },
    RowImage_left: {
      height: 20,
      width: 20,
      marginLeft: 10,
    },
    TopView_back:{
      // backgroundColor: '#1a98ff',
      height: Platform.OS == 'ios'?260:240,
      width: Common.window.width,
    },
    TopImage:{
      height: 60,
      width: 60,
      marginTop: 0,
      marginLeft: Common.window.width/2-30,
      borderRadius:30,
      borderColor:'white',
      borderWidth:2,
    },
    TopView_bottom:{
      marginTop:Platform.OS == 'ios'?10:10,
      height:Platform.OS == 'ios'?90:90,
      flexDirection: 'row',
      alignItems: 'center'
    },
    TopBottom_child:{
      width:(Common.window.width-20)/3,
      height:70,
      alignItems: 'center'
    },
    TopImage_back:{
     height: 60,
     width: Common.window.width,
     marginTop: Platform.OS == 'ios'?40:20,
     flexDirection: 'row'
    },
    TopCustomer_back:{
     backgroundColor:'rgba(22.0, 114.0, 226.0, 0.0)',
     alignItems: 'flex-start',
     height: 60,
     width: 40,
     marginTop: 0,
     marginRight:10,
     marginLeft:Common.window.width/4
   },
    Customer_Image:{
     marginLeft:10,
     width:20,
     height:20
   },
});

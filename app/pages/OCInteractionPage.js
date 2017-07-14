'use strict';
import React,{Component} from 'react';
import{
	StyleSheet,
	Text,
	View,
	Platform,
	TouchableOpacity,
	Image,
	Alert,
} from 'react-native';

import HeaderView from '../common/HeaderView';
import Common from '../common/common';
import Style from '../style/style';
import { toastShort } from '../utils/ToastUtil';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
var { NativeModules } = require('react-native');
var RNBridgeModule = NativeModules.RNBridgeModule;
import { NativeAppEventEmitter } from 'react-native';

export default class OCInteractionPage extends Component{

	componentDidMount(){
		NativeAppEventEmitter.addListener('rnInvokeMessageNotification',(reminder) => {
				var dic = JSON.parse(reminder);
				toastShort(dic.content);
		});
	}
	render(){
		return (
			<View style={{backgroundColor:'#F0F1F2',height:Common.window.height}}>
				<HeaderView titleView= {'原生交互'}
		        leftIcon={'angle-left'}
		        leftIconAction={() => this.props.navigator.pop() }
				/>
				<View style={{marginTop:20}}>
					<TouchableOpacity style={styles.center} onPress = {()=>this.onClickAction(0)}>
						<View style = {styles.Rowcontainer}>
						 	<Text style = {[Style.mainBody,{marginLeft:15,width:Common.window.width-35}]}>ReactNative访问调用iOS原生方法</Text>
						 	<Image style = {styles.RowImage_right} source = {require('../img/listPromte.png')}></Image>
					   </View>
					</TouchableOpacity>
					<TouchableOpacity style={styles.center} onPress = {()=>this.onClickAction(1)}>
						<View style = {styles.Rowcontainer}>
								<Text style = {[Style.mainBody,{marginLeft:15,width:Common.window.width-35}]}>iOS原生访问调用React Native</Text>
						 		<Image style = {styles.RowImage_right} source = {require('../img/listPromte.png')}></Image>
						 </View>
					</TouchableOpacity>
					<TouchableOpacity style={styles.center} onPress = {()=>this.onClickAction(2)}>
						<View style = {styles.Rowcontainer}>
								<Text style = {[Style.mainBody,{marginLeft:15,width:Common.window.width-35}]}>RN界面跳转原生界面</Text>
						 		<Image style = {styles.RowImage_right} source = {require('../img/listPromte.png')}></Image>
						 </View>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
	onClickAction(type){
		 switch (type) {
			 	case 0:{
					Alert.alert('两种调用方案','请选择',[
						{text:'使用Callback进行回调',onPress:()=>{
								var json = {"userid":"777"};
			          RNBridgeModule.rnInvokeOCCallBack(JSON.stringify(json),(error,events)=>{
			        			toastShort(events.toString())
			     		  })
						}},
						{text:'使用Promise进行回调',onPress:()=>this._updateEvents()}
					])
					break;
				}
				case 1:{
					RNBridgeModule.rnInvokeMessageNotification()
					break;
				}
			 	default:
				var json = {"content":""};
		    json.content = 'RN界面跳转原生界面\n\n'+'自古人生最忌满，半贫半富半自安。\n' +
				'半命半天半机遇，半取半舍半行善。\n' +
				'半聋半哑半糊涂，半智半愚半圣贤。\n' +
				'半人半我半自在，半醒半醉半神仙。\n' +
				'半亲半爱半苦乐，半俗半禅半随缘。\n' +
				'人生一半在于我，另外一半听自然。';
		    RNBridgeModule.rnInvokeChatView(JSON.stringify(json));
				break

		 }
	}
	async _updateEvents(){
    try{
        var events=await RNBridgeModule.RNInvokeOCPromise({'id':'888'});
        toastShort(events);
    }catch(e){
        toastShort(e.message);
    }
  }
}

var styles =StyleSheet.create({
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
	 marginRight:10,
	},
});

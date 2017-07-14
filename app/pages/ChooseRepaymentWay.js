'use strict';
import React,{Component} from 'react';
import{
	StyleSheet,
	Text,
	View,
	BackAndroid,
	Platform,
	TouchableOpacity,
	Image,

	ScrollView,
} from 'react-native';

import HeaderView from '../common/HeaderView';
import Common from '../common/common';
import Style from '../style/style';
import { toastShort } from '../utils/ToastUtil';

export default class ChoosRepaymentWay extends Component{

	render(){
		return (
				<View style={{backgroundColor:'#F0F1F2',height:Common.window.height}}>
						<HeaderView	titleView= {'还款方式'}
				       leftIcon={'angle-left'}
				       leftIconAction={() => this.props.navigator.pop() }
						/>
						<View style={{margin:20}}>
							<TouchableOpacity style={styles.center} onPress = {()=>this.onClickAction(0)}>
								<View style = {styles.Rowcontainer}>
								 	<Text style = {[Style.mainBody,{marginLeft:15,width:Common.window.width-35}]}>支付宝</Text>
								  <Image style = {styles.RowImage_right} source = {require("../img/listPromte.png")}></Image>
							  </View>
							</TouchableOpacity>
							<TouchableOpacity style={styles.center} onPress = {()=>this.onClickAction(1)}>
								<View style = {styles.Rowcontainer}>
									 <Text style = {[Style.mainBody,{marginLeft:15,width:Common.window.width-35}]}>微信支付</Text>
								 	 <Image style = {styles.RowImage_right} source = {require("../img/listPromte.png")}></Image>
								</View>
							</TouchableOpacity>
							<TouchableOpacity style={styles.center} onPress = {()=>this.onClickAction(2)}>
								 <View style = {styles.Rowcontainer}>
										<Text style = {[Style.mainBody,{marginLeft:15,width:Common.window.width-35}]}>银联支付</Text>
								 		<Image style = {styles.RowImage_right} source = {require("../img/listPromte.png")}></Image>
								 </View>
							</TouchableOpacity>
						</View>
				</View>
			)
		}
	onClickAction(){
		toastShort('该功能尚未开放，敬请期待');
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

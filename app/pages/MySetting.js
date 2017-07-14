'use strict';
import React,{Component} from 'react';
import{
	StyleSheet,
	Text,
	View,
	Platform,
	TouchableOpacity,
	Image,
	ScrollView,
} from 'react-native';

import HeaderView from '../common/HeaderView';
import Common from '../common/common';
import Login from '../pages/Login';
import AboutUs from '../pages/AboutUs';
import Style from '../style/style';
import { toastShort } from '../utils/ToastUtil';

export default class MySetting extends Component{
	render(){
		return (
			<View style={{backgroundColor:'#F0F1F2',height:Common.window.height}}>
				<HeaderView titleView= {'设置'}
		        leftIcon={'angle-left'}
		        leftIconAction={() => this.props.navigator.pop() }
				/>
				<View style={{marginTop:20}}>
					<TouchableOpacity style={styles.center} onPress = {()=>this.onClickAction(AboutUs)}>
						<View style = {styles.Rowcontainer}>
						 	<Text style = {[Style.mainBody,{marginLeft:15,width:Common.window.width-35}]}>关于我们</Text>
						 	<Image style = {styles.RowImage_right} source = {require('../img/listPromte.png')}></Image>
					   </View>
					</TouchableOpacity>

					<TouchableOpacity style={styles.center} onPress = {()=>this.onClickAction(Login)}>
						<View style = {styles.Rowcontainer}>
								<Text style = {[Style.mainBody,{marginLeft:15,width:Common.window.width-35}]}>登录界面</Text>
						 		<Image style = {styles.RowImage_right} source = {require('../img/listPromte.png')}></Image>
						 </View>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
	onClickAction(item){
		this.props.navigator.push({
				name:'二级',
				component:item,
		})
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

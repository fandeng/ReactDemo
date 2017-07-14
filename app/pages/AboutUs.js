'use strict';
import React,{Component} from 'react';
import {StyleSheet,
	Text,
	ListView,
	View,
	Image,
	Platform,
	TouchableOpacity,
	InteractionManager,
} from 'react-native';


import HeaderView from '../common/HeaderView';
import Common from '../common/common';
import Style from '../style/style';

var url = 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3458019669,1068439850&fm=26&gp=0.jpg';
export default class AboutUs extends Component{

	render(){
		return (
			<View>
				<HeaderView titleView= {'关于我们'}
					leftIcon={'angle-left'}
        	leftIconAction={() => this.props.navigator.pop() }
        />
				<View style={{height:Common.window.height-64}}>
				  <Image style={styles.img_style} source={{uri:url}}/>
					<Text style={[Style.mainBody,{textAlign:'center',lineHeight:28,marginTop:20}]}>
					 {
					 '自古人生最忌满，半贫半富半自安。\n' +
					 '半命半天半机遇，半取半舍半行善。\n' +
					 '半聋半哑半糊涂，半智半愚半圣贤。\n' +
					 '半人半我半自在，半醒半醉半神仙。\n' +
					 '半亲半爱半苦乐，半俗半禅半随缘。\n' +
					 '人生一半在于我，另外一半听自然。'
				   }
					</Text>
				</View>
			</View>
		)
	}

}


var styles =StyleSheet.create({
	img_style:{
		marginTop:20,
    height:200,
    width:Common.window.width,
    resizeMode:'contain'
	}
});

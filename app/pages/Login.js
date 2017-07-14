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
TextInput,
 ToastAndroid,
	ScrollView,
	Navigator,
} from 'react-native';

import Common from '../common/common';
import Register from '../pages/Register';
import HeaderView from '../common/HeaderView';

import REQUEST_JSON from '../Data/Request.json';
var DataRepository = require('../Data/DataRepository');
var repository = new DataRepository();
var  Response =require('../Data/Response');

import StyleImport from '../style/style';
import { toastShort } from '../utils/ToastUtil';

var phoneNum='';
var password='';
var url = 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3458019669,1068439850&fm=26&gp=0.jpg';

export default class Login extends Component{
	constructor(props) {
	  super(props);
	}
	render(){
		return (
			<View style={{backgroundColor:'#F0F1F2',flex:1}}>
					<HeaderView titleView= {'登录'}
						leftIcon={'angle-left'}
						leftIconAction={() => this.props.navigator.pop()}
						rightButton={'注册'}
	           collectIconAction={this.onClickRegister.bind(this)}
					/>
					<View style={styles.topview_style}>
						<Image style={styles.img_style} source={{uri:url}}/>
					</View>
					<View  style={styles.phone_style}>
						<Image style = {{height:24,width:24,marginLeft:15}} source={require('../img/phone.png')}/>
						<TextInput
				       style={styles.input_style}
				       placeholder='请输入手机号'
				       underlineColorAndroid={'transparent'}
				       onChangeText={(text) => {phoneNum=text;}}
				     />
					</View>
					<View  style={styles.phone_style}>
						<Image style = {{height:24,width:24,marginLeft:15}} source={require('../img/phone.png')}/>
						<TextInput
				       style={styles.input_style}
				       placeholder='请输入密码'
				       underlineColorAndroid={'transparent'}
				       secureTextEntry={true}
				       onChangeText={(text) => {password=text;}}
				    />
					</View>
					<View style={{height:40,alignItems:'center',marginTop:25}}>
						<TouchableOpacity style={styles.button} onPress = {this.onClickLogin.bind(this)}>
							<Text style={StyleImport.whiteText_style}>登录</Text>
						</TouchableOpacity>
					</View>
			</View>
		)
	}
	onClickLogin(){
		if (this.isNull(phoneNum)) {
		 		toastShort('请输入电话号码');
		 		return
		}
		if (this.isNotPhoneNum(phoneNum)) {
		 		toastShort('请输正确的入电话号码');
		 		return
		}
		if (this.isNull(password)) {
		 		toastShort('请输入密码');
		 		return
		}
		this.request(item)
	}
	onClickRegister(item){
			this.props.navigator.push({
				 name: '二级',
				 component: Register,
			})
	}

	request(id) {

		if (id==LOGIN_FLAG) {

			var userlogin = REQUEST_JSON.userlogin;
        	userlogin.servnum=phoneNum;
        	userlogin.password=password;
        	userlogin.logintype=10;
	        repository.launchRequest('userlogin',userlogin).then((responseData) => {
	        	// console.log('request  response======>'+responseData.response_head.retinfo.retcode);
	        	if(responseData.response_head.retinfo.retcode=="0"){

	        		// alert('sdsdss');
		            storage.save({
				    key: USER_INFO,  //注意:请不要在key中使用_下划线符号!
				    rawData: responseData,

				    // 如果不指定过期时间，则会使用defaultExpires参数
				    // 如果设为null，则永不过期
				    expires: null,
				  });
		          this.props.navigator.pop();
				}else{
					// alert('hahah');
					// toastShort();
					loginNum++;
					if (loginNum>=3) {
						this.setState({
							margintop:10,
				  			codeheight:60,
						})
					}
				}
	        }).done();
		}

		if (id==3) {

		}

    }
	isNull(str){
		if ( str == "" ) {return true; }
		var regu = "^[ ]+$";
		var re = new RegExp(regu);
		return re.test(str);
	}
	isNotPhoneNum(str){
		var regu='^(1[2-9])\\d{9}$';
		var re = new RegExp(regu);
		return !re.test(str);
	}
}

var styles =StyleSheet.create({
	topview_style:{
		height:120,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom:20
	},
	img_style:{
    height:100,
    width:100,
    resizeMode:'contain'
	},
	phone_style:{
		flexDirection:'row',
		height:50,
		alignItems:'center',
		marginLeft:30,
		width:Common.window.width-60,
		borderBottomWidth:1,
		borderBottomColor:'#D3D3D3'
	},
	input_style:{
    height:40,
    fontSize:14,
		marginTop:5,
		width:Common.window.width-120,
    marginLeft:Platform.OS == 'ios'?15:0,
		padding:0
  },
  button: {
    width: Common.window.width-60,
    backgroundColor: '#1a98ff',
    height:40,
    alignItems:'center',
		justifyContent: 'center',
    borderRadius: 10,
  },
});

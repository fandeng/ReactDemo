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
} from 'react-native';

import Common from '../common/common';
import HeaderView from '../common/HeaderView';

import REQUEST_JSON from '../Data/Request.json';
var DataRepository = require('../Data/DataRepository');
var repository = new DataRepository();
var  Response =require('../Data/Response');
import StyleImport from '../style/style';
import { toastShort } from '../utils/ToastUtil';

var showNum='获取验证码';
// var vertiyfCode="";
// var phoneNum="";
// var password="";

const VERTIFYCODE_FLAG=1;
const REGISTER_FLAG=2;
const CONTACT_SELECT_FLAG=3;
const  CONSTRACT_DETIAL_FLAG=4;

var month_but_width=Common.window.width-60;

export default class Login extends Component{

	constructor(props) {
	  super(props);

	  this.state = {
	  	isSelect:true,
	  	sum:60,
	  	data:Response.smsvalidatecode.response_body,
	  	vertifycode:'',
	  	phonenum:'',
	  	password:'',
	  };
	}

	render(){

		var imgsorce= this.state.isSelect ? require('../img/agree.png'):require('../img/disagree.png');
		var  vertifybtn_style= showNum=='获取验证码' ? StyleImport.button_style:[StyleImport.button_style,{borderColor:'#999999'}];
		return(
			<View style={{backgroundColor:'#F0F1F2',flex:1}}>
			<HeaderView
						titleView= {'注册'}
		                leftIcon={'angle-left'}
		                leftIconAction={() => this.props.navigator.pop() }
					/>
				<View style={{paddingLeft:30,paddingRight:30,marginTop:30}}>
				<View style={{height:165,flexDirection:'column',justifyContent: 'flex-start'}}>
						<View  style={styles.phone_style}>
							<Image style = {{height:25,width:25,marginLeft:15}} source={require('../img/phone.png')}/>
							<View  style={styles.phone_style}>
							<TextInput
					          style={styles.style_input}
					          placeholder="请输入手机号"
					          underlineColorAndroid={'transparent'}
					          numberOfLines={1}
					          onChangeText={(text) => this.setState({phonenum:text})}
					        />
					        </View>
						</View>

						<View style={{height:1,backgroundColor:'#D3D3D3',alignItems:'center'}}></View>

						<View  style={styles.verfity_style}>
							<Image style = {{height:25,width:25,marginLeft:15}} source={require('../img/vertifycode.png')}/>
							<View  style={styles.verfity_style}>
							<TextInput
					          style={styles.style_input}
					          placeholder="请输入验证码"
					          underlineColorAndroid={'transparent'}
					          numberOfLines={1}
					          onChangeText={(text) => this.setState({vertifycode:text})}
					        />
					        </View>
					        <TouchableOpacity style={showNum=='获取验证码' ? styles.button_vertify:[styles.button_vertify,{borderColor:'#999999'}]}
									onPress = {this.onClick.bind(this,1)}>
					        <Text style={showNum=='获取验证码' ? {color:'#1a98ff',fontSize:Platform.OS == 'ios' ? 10:12}:{color:'#999999',fontSize:Platform.OS == 'ios' ? 10:12}}>{showNum}</Text>
					        </TouchableOpacity>
						</View>
						<View style={{height:1,backgroundColor:'#D3D3D3',alignItems:'center'}}></View>
						<View  style={styles.password_style}>
							<Image style = {{height:25,width:25,marginLeft:15}} source={require('../img/phone.png')}/>
							<View  style={styles.password_style}>
							<TextInput
					          style={styles.style_input}
					          placeholder="请输入密码"
					          underlineColorAndroid={'transparent'}
					          numberOfLines={1}
					          secureTextEntry={true}
					          onChangeText={(text) => this.setState({password:text})}

					        />
					        </View>
						</View>

				</View>

					<View style={{height:40,alignItems:'center',marginTop:25}}>
						<TouchableOpacity style={[vertifybtn_style,{width:month_but_width,height:50}]}
									onPress = {this.onClick.bind(this,2)}>
									<Text style={{textAlign:'center',color:'#ffffff',fontSize:15}}>注册</Text>
						</TouchableOpacity>

					</View>

					<View  style={{flexDirection:'row',alignItems:'flex-start'}}>
						<TouchableOpacity style={{width:25,height:50,justifyContent:'center',alignItems:'flex-start'}}
										onPress = {this.onClick.bind(this,3)}>
										<Image style = {{height:18,width:18}} source={imgsorce}/>
						</TouchableOpacity>
						<View style={{height:50,justifyContent:'center',alignItems:'flex-start'}}>
							<Text style={{textAlign:'center'}}>我已阅读并同意</Text>

						</View>
						<TouchableOpacity style={{height:50,justifyContent:'center',alignItems:'flex-start'}}
										onPress = {this.onClick.bind(this,4)}>
										<Text style={{textAlign:'center',color:'#1a98ff'}}>《注册用户服务合同》</Text>
						</TouchableOpacity>
					</View>
					</View>
			</View>
			)
	}


	onClick(item){

		if (item==VERTIFYCODE_FLAG) {
			if (!this.isNull(this.state.phonenum) && !this.isNotPhoneNum(this.state.phonenum)) {
				this.request(1);
				this.interval=setInterval(() => {
				showNum='剩余'+this.state.sum+'S';
					if (this.state.sum==0) {
						 this.interval && clearInterval(this.interval);
						 this.setState({sum:60});
						 showNum='获取验证码';
					}
				this.setState({sum:(this.state.sum-1)});

   				}
   				,1000);
   			}else{
   				if (this.isNull(this.state.phonenum)) {
   					toastShort('请输入手机号');

   				}else{
   					if (this.isNotPhoneNum(this.state.phonenum)) {
   						toastShort('请输入正确的手机号');

   					}
   				}


   			}
		}


		if (item==REGISTER_FLAG) {
			 this.interval && clearInterval(this.interval);
			 this.setState({sum:60});
			showNum='获取验证码';
			this.request(2);
		}

		if (item==CONTACT_SELECT_FLAG) {
			let select=!this.state.isSelect;
			this.setState({
				isSelect:select,
			})
		}
	}

	request(id) {
		if (id==VERTIFYCODE_FLAG) {
			var smsvalidatecode = REQUEST_JSON.smsvalidatecode;

	        repository.launchRequest('smsvalidatecode',smsvalidatecode).then((responseData) => {
	        	console.log('request  response======>'+responseData.response_body);
	        	responseData.response_body.validatecode="1234"
	            this.setState({
						vertifycode:responseData.response_body.validatecode,
					})
	        }).done();
		}
		if (id==REGISTER_FLAG) {
			if (this.isNull(this.state.vertifycode)) {
				toastShort('请输入验证码');

				return
			}
			if (this.isNull(this.state.phonenum)) {
				toastShort('请输入电话号码');

				return
			}
			if (this.isNull(this.state.password)) {
				toastShort('请输入密码');

				return
			}
			if (this.isNotPhoneNum(this.state.phonenum)) {
				toastShort('请输入正确的手机号');

				return
			}
			if (!this.state.isSelect) {
				toastShort('请同意服务合同');

				return
			}

			var userregister = REQUEST_JSON.userregister;
        	userregister.servnum=this.state.vertifycode;
        	userregister.phonenum=this.state.phonenum;
        	userregister.password=this.state.password
	        repository.launchRequest('userregister',userregister).then((responseData) => {
	        	console.log('request  response======>'+responseData.response_body);
	        	responseData.response_body.name="樊登";
	        	storage.save({
			    key: 'userinfo',  //注意:请不要在key中使用_下划线符号!
			    rawData: responseData,
			    // 如果不指定过期时间，则会使用defaultExpires参数
			    // 如果设为null，则永不过期
			    expires: null,
			  });

	        }).done();





		}

    }

componentWillUnmount(){
    this.interval && clearInterval(this.interval);
	showNum='获取验证码';
}

	isNull(str){
		if ( str == "" ) {return true; }
		if (!str) {
			return true;
		}
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
	view_style:{flex:1,justifyContent: 'flex-end',flexDirection:'row',height:60},
	input_style:{ marginTop: 10,
    height: 40,
    borderRadius: 5,
   borderWidth: 1,
    borderColor: 'lightblue'},

     style_input:{
      backgroundColor:'#fff',
      fontSize:14,
      height:35,
      flex:1,
       marginLeft:Platform.OS == 'ios'?15:0,
  },

   button_vertify: {height:Platform.OS == 'ios'?25:30,width:Platform.OS == 'ios'?72:90,borderColor:'#1a98ff',
   			marginRight:15, alignItems:'center',
   			justifyContent: 'center', borderRadius: 10,
   			borderWidth:1
   			},
   	 button: {
        width: 90,
		height:30,
        backgroundColor: '#999999',
        alignItems:'center',justifyContent: 'center',
        borderRadius: 10,

    },
    phone_style:{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'
    				,borderTopLeftRadius:15,borderTopRightRadius:15,backgroundColor:'#FFFFFF'},
    verfity_style:{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'#FFFFFF'},
    password_style:{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'
    					,borderBottomLeftRadius:15,borderBottomRightRadius:15,backgroundColor:'#FFFFFF'}
});

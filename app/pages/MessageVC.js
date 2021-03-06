//消息界面
'use strict';
import React, {
    Component
} from 'react';
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
    TextInput,
    Platform,
    BackAndroid
} from 'react-native';

import Common from '../common/common';
import HeaderView from '../common/HeaderView';
import WebViewDetails from '../components/WebDetails'
import ResponseData from '../Data/Response.json';
import REQUEST_JSON from '../Data/Request.json';
import Style from '../style/style';
var DataRepository = require('../Data/DataRepository');
var repository = new DataRepository();
var arr = new Array();
export default class MessageVC extends Component {
  constructor(props) {
      super(props);
      this.state = {
        data:this.isTime(ResponseData.querysysmsgs.response_body.msgs),
      };
  }
  componentDidMount(){
		 BackAndroid.addEventListener('hardwareBackPress', () => {
    		this.props.navigator.pop()
     		return true
		});
	}
  render() {
        this.request();
        return (
          <View>
            <HeaderView  titleView= {'消息'}
              leftIcon={'angle-left'}
              leftIconAction={() => this.props.navigator.pop() }/>
              <ScrollView style={{backgroundColor:'#f0f1f2', height: Common.window.height-64,width:Common.window.width}}>
                  <View style={{backgroundColor:'#f0f1f2',height:this.state.data[0].length==0?0:40}}>
                      <Text style={[Style.subtitle,{marginLeft:10,width:80,marginTop:15}]}>{this.state.data[0].length==0?'':'今天'}</Text>
                  </View>
                  {this.state.data[0].length==0?null:this.renderItems(this.state.data[0],0)}

                  <View style={{backgroundColor:'#f0f1f2',height:this.state.data[1].length==0?0:40}}>
                      <Text style={[Style.subtitle,{marginLeft:10,width:80,marginTop:15}]}>{this.state.data[1].length==0?'':'昨天'}</Text>
                  </View>
                  {this.state.data[1].length==0?null:this.renderItems(this.state.data[1],1)}

                  <View style={{backgroundColor:'#f0f1f2',height:this.state.data[2].length==0?0:40}}>
                      <Text style={[Style.subtitle,{marginLeft:10,width:80,marginTop:15}]}>{this.state.data[2].length==0?'':'最近一周'}</Text>
                  </View>
                  {this.state.data[2].length==0?null:this.renderItems(this.state.data[2],1)}

                  <View style={{backgroundColor:'#f0f1f2',height:this.state.data[3].length==0?0:40}}>
                      <Text style={[Style.subtitle,{marginLeft:10,width:80,marginTop:15}]}>{this.state.data[3].length==0?'':'一周以前'}</Text>
                  </View>
                  {this.state.data[3].length==0?null:this.renderItems(this.state.data[3],1)}

              </ScrollView>
          </View>
      );
  }
  renderItems(data,sign){
     return data.map(function(items,i){
       let titlecolor = items.type == '002'?'red':'#333333';
       let date = new Date(items.time*1000).toLocaleDateString().replace(/\//g, "-");
       let time = new Date(items.time*1000).toTimeString().substr(0, 8)
        return (
          <View key={i} style = {styles.container}>
              <View style={{height:30,alignItems:'center',flexDirection:'row',marginTop:10}}>
                 <Text style = {[Style.mainBody,{width:80,marginLeft: 10,color:titlecolor}]}>{items.title}</Text>
                 <Text style = {[Style.caption,{width:150,marginLeft:5,textAlign:'left'}]}>
                  {sign == 1?date+' '+time:time}
                 </Text>
              </View>
              <Text style = {[Style.mainBody,styles.text_style]}>{items.content}</Text>
         </View>
       )
     });
  }
  request() {
      var querysysmsgs = REQUEST_JSON.querysysmsgs;
      querysysmsgs.msgtype = '1';
      querysysmsgs.pagenum = '1';
      querysysmsgs.pagesize = '20';
      repository.launchRequest('querysysmsgs',querysysmsgs).then((responseData) => {

        }).done();
  }
  isTime(array){
    var arr1 = new Array();
    var arr2 = new Array();
    var arr3 = new Array();
    var arr4 = new Array();
    for (var i = 0; i < array.length; i++) {
       var days = Math.floor(((new Date()).valueOf() - array[i].time*1000)/(24*3600*1000))
       if(days==0){
         arr1.push(array[i])
       } else if(days > 0 && days < 2){
         arr2.push(array[i])
       } else if(days >=2 && days <= 7){
         arr3.push(array[i])
       } else if(days > 7){
         arr4.push(array[i])
       }
    }
    arr.push(arr1)
    arr.push(arr2)
    arr.push(arr3)
    arr.push(arr4)
    return arr;
  }
}

const styles = StyleSheet.create({
      center:{
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center',
      },
      container: {
          width: Common.window.width,
          backgroundColor: 'white',
          borderBottomColor: 'rgba(230.0, 230.0, 230.0, 1.0)',
          borderBottomWidth: 1,
      },
      text_style:{
        width:Common.window.width-20,
        marginTop:5,
        marginLeft: 10,
        marginBottom:10,
        lineHeight:22,
        color: '#666666'
      }
});

/*constructor(props) {
    super(props);
    this._renderRow = this.renderRow.bind(this);
    this.state = {
      data:ResponseData.querysysmsgs.response_body,
      dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
}
render() {
  this.request();
    return (
        <View>
          <HeaderView  titleView= {'消息'}
          leftIcon={'angle-left'}
          leftIconAction={() => this.props.navigator.pop() }/>
          {
            <ListView
                dataSource={this.state.dataSource.cloneWithRows(this.state.data.msgs) }
                renderRow={this._renderRow}
                enableEmptySections={true}
                style={{ height: Common.window.height-64,backgroundColor:'#f0f1f2'}}//减去导航的高度
            />
          }
        </View>
    );
}
renderRow(rowDate,sectionID, rowID) {
    return (
        <TouchableOpacity
            activeOpacity={0.75}
            onPress={this._onPressFeedItem.bind(this, rowDate) }
            style={styles.center}>
            <View style = {styles.container}>
                <View style={{height:30,alignItems:'center',flexDirection:'row',marginTop:10}}>
                   <Text style = {[Style.mainBody,{width:Common.window.width-100,marginLeft: 10}]}>{rowDate.title}</Text>
                   <Text style = {[Style.caption,{width:70,marginLeft:10,marginRight:10,textAlign:'right'}]}>{rowDate.time}</Text>
                </View>
                <Text style = {[Style.subtitle,{width:Common.window.width-20,marginTop:5,marginLeft: 10}]} numberOfLines = {3}>{rowDate.content}</Text>
           </View>
        </TouchableOpacity>
    );
}
_onPressFeedItem(rowDate, rowID) {
  InteractionManager.runAfterInteractions(() => {
      // this.props.navigator.push({
      //     name: '详情',
      //     component: WebViewDetails,
      //     passProps:{
      //       info:rowDate.linkurl,
      //     }
      // })
  });
}
request() {
    var querysysmsgs = REQUEST_JSON.querysysmsgs;
    querysysmsgs.msgtype = '1';
    querysysmsgs.pagenum = '1';
    querysysmsgs.pagesize = '20';
    repository.launchRequest('querysysmsgs',querysysmsgs).then((responseData) => {
        console.log(responseData.response_body);
    }).done();
}*/

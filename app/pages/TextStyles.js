//字体样式
'use strict';
import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
} from 'react-native';

import Common from '../common/common';
import HeaderView from '../common/HeaderView';

class TextStyleFD extends Component {
  render() {
      return(
        <View>
          <HeaderView  titleView= {'字体样式'}
          leftIcon={'angle-left'}
          leftIconAction={() => this.props.navigator.pop() }/>
          {
            <ScrollView style = {{width:Common.window.width,height:Common.window.height-64}}>
               <Text style = {styles.headline}>一号，导航栏</Text>
               <View style = {{width:Common.window.width,height:50,backgroundColor:'aqua'}}>
                  <Text style={styles.navigatorTitle}>自古人生最忌满，半贫半富半自安</Text>
                  <Text style={styles.container}>描述:大小16，fontWeight:bold，左对齐</Text>
               </View>

               <Text style = {styles.headline}>二号，标题</Text>
               <View style = {{width:Common.window.width,height:50,backgroundColor:'aqua'}}>
                  <Text style={styles.title}>半命半天半机遇，半取半舍半行善</Text>
                  <Text style={styles.container}>描述:大小15，fontWeight:normal，右对齐</Text>
               </View>

               <Text style = {styles.headline}>三号，副标题</Text>
               <View style = {{width:Common.window.width,height:50,backgroundColor:'aqua'}}>
                  <Text style={styles.subheading}>半聋半哑半糊涂，半智半愚半圣贤</Text>
                  <Text style={styles.container}>描述:大小14，fontWeight:100，居中</Text>
               </View>

               <Text style = {styles.headline}>四号：小标题</Text>
               <View style = {{width:Common.window.width,height:50,backgroundColor:'aqua'}}>
                  <Text style={styles.subtitle}>半人半我半自在，半醒半醉半神仙</Text>
                  <Text style={styles.container}>描述:大小13，fontWeight:200，左对齐</Text>
               </View>

               <Text style = {styles.headline}>五号：内容主体</Text>
               <View style = {{width:Common.window.width,height:50,backgroundColor:'aqua'}}>
                  <Text style={styles.mainBody}>半亲半爱半苦乐，半俗半禅半随缘</Text>
                  <Text style={styles.container}>描述:大小12，fontWeight:300，左对齐</Text>
               </View>

               <Text style = {styles.headline}>六号：说明摘要</Text>
               <View style = {{width:Common.window.width,height:50,backgroundColor:'aqua'}}>
                  <Text style={styles.caption}>人生一半在于我，另外一半听自然</Text>
                  <Text style={styles.container}>描述:大小11，fontWeight:400，左对齐</Text>
               </View>
            </ScrollView>
          }
        </View>
    );
  }
}
const styles = StyleSheet.create({
      container: {
        marginLeft:10,
        marginTop:5,
        height:20,
        textAlign: 'left',
        fontSize: 14,
        fontWeight: 'bold',
        color: 'red',
      },
      headline:{
        marginLeft:10,
        marginTop:10,
        height:30,
        color:'black',
        fontWeight:'bold',
        fontSize:18
      },
      navigatorTitle:{
        marginLeft:10,
        marginTop:5,
        height:20,
        textAlign: 'left',
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
      },
      title:{
        marginRight:10,
        marginTop:5,
        height:20,
        textAlign: 'right',
        fontSize: 15,
        fontWeight: 'normal',
        color: 'black',
      },
      subheading:{
        marginTop:5,
        height:20,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '100',
        color: 'black',
      },
      subtitle:{
        marginLeft:10,
        marginTop:5,
        height:20,
        textAlign: 'left',
        fontSize: 13,
        fontWeight: '200',
        color: 'black',
      },
      mainBody:{
        marginLeft:10,
        marginTop:5,
        height:20,
        textAlign: 'left',
        fontSize: 12,
        fontWeight: '300',
        color: 'black',
      },
      caption:{
        marginLeft:10,
        marginTop:5,
        height:20,
        textAlign: 'left',
        fontSize: 11,
        fontWeight: '400',
        color: 'black',
      },
});

module.exports = TextStyleFD;

//listView
/*constructor(props) {
    super(props);
    this._renderRow = this.renderRow.bind(this);
    this.state = {
      dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
}
render() {
    return (
        <View style = {{backgroundColor: '#f0f1f2'}}>
              <ListView
                  dataSource={this.state.dataSource.cloneWithRows(classList) }
                  renderRow={this._renderRow}
                  renderHeader={this._renderHeader}
                  enableEmptySections={true}
                  style={{ height: Common.window.height-49}}//减去导航的高度
              />

        </View>
    );
}
_renderHeader(){
  return (
    <View style = {styles.TopView_back}>
       <View style = {styles.TopImage_back}>
          <Image style = {styles.TopImage} source = {require('../img/love.png')}></Image>
       </View>
       <Text style = {styles.TopPhone_text}>手机号码</Text>
       <Text style = {styles.TopName_text}>姓名</Text>
       <View style = {styles.TopView_bottom}>
          <View style={[styles.TopBottom_child,{marginLeft:10}]}>
             <Text style={styles.TopBottom_text}>申请贷款(笔)</Text>
             <Text style={styles.TopBottom_text}>2</Text>
          </View>
          <View style={{backgroundColor:'rgba(255.0, 255.0, 255.0, 0.5)',width:1,height:70}}/>
          <View style={styles.TopBottom_child}>
             <Text style={styles.TopBottom_text}>需还贷款(笔)</Text>
             <Text style={styles.TopBottom_text}>2</Text>
          </View>
       </View>
    </View>
  );
}

renderRow(rowDate,sectionID: number | string, rowID: number | string,) {
   let img = IMGLIST[rowID]
    return (
        <TouchableOpacity
            activeOpacity={0.75}
            onPress={this._onPressFeedItem.bind(this, rowDate, rowID) }
            style={styles.center}
        >
        <View style = {styles.Rowcontainer}>
            <Image style = {styles.RowImage_left} source = {img}></Image>
            <Text style = {styles.RowTitle_text}>{rowDate}</Text>
            <Image style = {styles.RowImage_right} source = {img}></Image>
        </View>
        </TouchableOpacity>
    );
}

_onPressFeedItem(rowDate, rowID) {
    InteractionManager.runAfterInteractions(() => {
      if (rowID ==2) {
        this.props.navigator.push({
            name: 'UI组件',
            component: ControlFD,
        })
      } else {
        alert('待实现')
      }
    });
    <Image source = {{uri: (this.props.isCollect == false || this.props.isCollect == undefined) ? 'no_collect.png' : 'has_collect.png'}} style = {styles.right_image}></Image>
}*/

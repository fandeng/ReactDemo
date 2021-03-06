/**
 * Created by ljunb on 16/5/8.
 * 导航栏标题
 */
 'use strict';
import React from 'react';
import {
    StyleSheet,
    Platform,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

import Common from '../common/common';


export default class Header extends React.Component {

    render() {

        let NavigationBar = [];
        // 左边图片按钮
        if (this.props.leftIcon != undefined) {
            NavigationBar.push(
                <TouchableOpacity
                    key={'leftIcon'}
                    activeOpacity={0.75}
                    onPress={this.props.leftIconAction}
                    style = {[styles.touch_style, {width: 50}]}
                >
                    <View style = {styles.left_view}>
                      <Image style = {styles.left_image} source={require('../img/back.png')}/>
                    </View>
                </TouchableOpacity>
            )
        }
        // 自定义标题View
        if (this.props.titleView != undefined) {
            let Component = this.props.titleView;
            NavigationBar.push(
                <Text key={'titleView'} style={(this.props.leftIcon == undefined)? styles.title_view_no_left : styles.title_view_contain_left}>{this.props.titleView}</Text>
            )
        }

        if (this.props.rightButton != undefined) {
            NavigationBar.push(
              <TouchableOpacity
                  key={'rightIcon'}
                  activeOpacity={0.75}
                  onPress={this.props.collectIconAction}
                  style = {[styles.touch_style, {width: 50}]}
                  >
                  <View style = {styles.right_view}>
                      {this.props.rightButton=='home'?(<Image style = {styles.right_image} source={require('../img/message.png')}/>):(<Text style= {styles.right_title}>{this.props.rightButton}</Text>)}
                  </View>
              </TouchableOpacity>
            )
        }
        return (
            <View style={styles.navigationBarContainer}>
                {NavigationBar}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    navigationBarContainer: {
      // flex: 1,
        marginTop: 0,
        flexDirection: 'row',
        height: Platform.OS == 'ios'?64:50,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        backgroundColor: 'white',
    },
    titlestyle: {
        fontSize: 15,
        marginLeft: 15,
        color: 'white',
        alignSelf: 'flex-start',
    },
    title_view_contain_left: {
        width:Platform.OS == 'ios'?Common.window.width-100:Common.window.width-100,
        fontSize: 16,
        marginTop: Platform.OS == 'ios'?20:0,
        color: '#333333',
        textAlign:'center',
        marginLeft:3
    },
    title_view_no_left: {
      flex:1,
      fontSize: 16,
      marginTop: Platform.OS == 'ios'?20:0,
      width:Common.window.width-90,
      marginLeft:45,
      color: '#333333',
      textAlign:'center',
    },
    touch_style: {
       marginTop: Platform.OS == 'ios'?20:0,
    },

    left_view: {
      width:30,
      height:20,
      alignSelf:'center'
    },
    left_image: {
      marginLeft: 5,
      height:16,
      width:10,
      marginTop:2
    },
    right_view: {
      width:50,
      height:20,
      alignSelf:'center'
    },
    right_title: {
      fontSize: 15,
      textAlign:'left',
      color: '#333333',
      marginRight:5
    },
    right_image: {
      marginRight: 5,
      height:18,
      width:25,
      marginTop:0
    },
})

//组件
'use strict';
import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    ListView,
    TouchableOpacity,
    View,
    InteractionManager,
    Dimensions,
    TextInput,
    Platform,
} from 'react-native';

import Common from '../common/common';
import HeaderView from '../common/HeaderView';
import TextStyleFD from './TextStyles'
import AlertStyleFD from './AlertStyle'
import ButtonStyleFD from './ButtonStyle'
import DatePickerStyleFD from './DatePickerStyle'
import DatePickerStyleIOS from './DatePickerIOS'

export default class ControlFD extends Component {
  constructor(props) {
      super(props);
      this._renderRow = this.renderRow.bind(this);
      this.state = {
        dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        }),
      };
  }
    render() {
      let classList = ['字体样式', '提示框', '点击button', '选择日期', '标题栏'];
        return (
          <View>
            <HeaderView  titleView= {'UI组件'}
            leftIcon={'angle-left'}
            leftIconAction={() => this.props.navigator.pop() }/>
            {
              <ListView
                  dataSource={this.state.dataSource.cloneWithRows(classList) }
                  renderRow={this._renderRow}
                  enableEmptySections={true}
                  style={{ height: Common.window.height-64}}//减去导航的高度
              />
            }
          </View>
      );
  }
  renderRow(rowDate,sectionID: number | string, rowID: number | string,) {
      return (
          <TouchableOpacity
              activeOpacity={0.75}
              onPress={this._onPressFeedItem.bind(this, rowDate, rowID) }
              style={styles.center}
          >
          <View style = {styles.container}>
              <Text style = {styles.title_text} numberOfLines = {2}>{rowDate}</Text>
          </View>
          </TouchableOpacity>
      );
  }
  _onPressFeedItem(rowDate, rowID) {
      InteractionManager.runAfterInteractions(() => {
        if (rowID == 0) {
          this.props.navigator.push({
              name: '字体样式',
              component: TextStyleFD,
          })
        } else if (rowID == 1) {
          this.props.navigator.push({
              name: '提示框',
              component: AlertStyleFD,
          })
        } else if (rowID == 2) {
          this.props.navigator.push({
              name: '按钮',
              component: ButtonStyleFD,
          })
        } else if (rowID == 3) {
          this.props.navigator.push({
              name: '日期选择器',
              component: Platform.OS == 'ios'?DatePickerStyleIOS:DatePickerStyleFD,
          })
        } else {
          alert('待实现')
        }

      });
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
        height:45,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderBottomColor: 'darkgray',
        borderBottomWidth: 1,
      },
      title_text: {
        textAlign: 'left',
        fontSize: 14,
        color: 'black',
        marginTop:15,
        marginLeft:10,
      },
});

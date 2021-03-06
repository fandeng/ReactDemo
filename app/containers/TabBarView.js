'use strict';
import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Platform
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

import HomeContainer from '../containers/HomeContainers';
import FindContainers from '../containers/FindContainers';
import MineContainer from '../containers/MineContainer';
import Common from '../common/common';

var lastHeight = Common.window.height;

const tabBarItems = [
    { title: '首页',  icon: () => <Image style={{ width: 28, height: 26 }} source={require('../img/home_off.png')}/>, component: HomeContainer, selectedicon: () => <Image style={{ width: 28, height: 26 }} source={require('../img/home_on.png')}/>},
    { title: '发现',icon: () => <Image style={{ width: 30, height: 30 }} source={require('../img/find_off.png')}/>,component: FindContainers,selectedicon: () => <Image style={{ width: 30, height: 30 }} source={require('../img/find_on.png')}/>},
    { title: '我的',  icon: () => <Image style={{ width: 25, height: 26 }} source={require('../img/mine_off.png')}/>,component: MineContainer, selectedicon: () => <Image style={{ width: 25, height: 26 }} source={require('../img/mine_on.png')}/>},
]


export default class TarBarView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: tabBarItems[0].title,
        };
    }
    render() {
        return (
            <TabNavigator tabBarStyle={{height:49, backgroundColor:'white'} }>
                {
                    tabBarItems.map((controller, i) => {
                        let Component = controller.component;
                        return (
                            <TabNavigator.Item
                                key= {i}
                                selected={this.state.selectedTab === controller.title}
                                title={controller.title}
                                selectedTitleStyle={{color:'#1a98ff'}}
                                titleStyle={{color:'#666'}}
                                renderIcon={controller.icon}
                                renderSelectedIcon={controller.selectedicon}
                                onPress={() => this.setState({ selectedTab: controller.title }) }>
                                <Component navigator = {this.props.navigator} {...this.props}/>
                            </TabNavigator.Item>
                        )
                    })
                }
            </TabNavigator >


        );
    }
}

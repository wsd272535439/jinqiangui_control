/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { TabBar, Icon , Toast } from 'antd-mobile';
import TabNavigator from 'react-native-tab-navigator';
import HomePage from './src/pages/HomePage'
import AboutUsPage from './src/pages/AboutUsPage'
import FunctionList from './src/pages/FunctionList'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
    Image,
    Dimensions
} from 'react-native';
let window = Dimensions.get('window');
var width = window.width;
var height = window.height;
export default class MoneyTurtle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
      hidden: false,
      isOk:true
    };
  }

  async _fetchData(){
    try{
      let response = await fetch('http:47.94.133.192:7001/api/jinqiangui/pay-info')
      let responseJson = await response.json()
      console.log('response',responseJson)
      if(responseJson.code === 0){
        this.setState({
          isOk:responseJson.data
        })
      }
    }catch(e){
      Toast.fail('网络超时')
    }

  }

  componentDidMount(){
    this._fetchData()
  }

  render() {
    return this.state.isOk ? (
          <TabNavigator>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'home'}
                title="注册授权"
                renderIcon={() => <Image source={require('./src/images/icons8-home.png')} style={styles.tabbarIcon} />}
                renderSelectedIcon={() => <Image source={require('./src/images/icons8-home 3.png')} style={styles.tabbarIcon}/>}
                onPress={() => this.setState({ selectedTab: 'home' })}>
              <HomePage changeTabBar={(bar)=>{
                this.setState({
                  selectedTab:bar
                })
              }}/>
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'funclist'}
                title="功能列表"
                renderIcon={() => <Image source={require('./src/images/icons8-christmas_star.png')} style={styles.tabbarIcon}/>}
                renderSelectedIcon={() => <Image source={require('./src/images/icons8-christmas_star 2.png')} style={styles.tabbarIcon} />}
                onPress={() => this.setState({ selectedTab: 'funclist' })}>
              <FunctionList/>
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'aboutUs'}
                title="关于我们"
                renderIcon={() => <Image source={require('./src/images/icons8-contacts 2.png')} style={styles.tabbarIcon}/>}
                renderSelectedIcon={() => <Image source={require('./src/images/icons8-contacts.png')} style={styles.tabbarIcon}/>}
                onPress={() => this.setState({ selectedTab: 'aboutUs' })}>
              <AboutUsPage/>
            </TabNavigator.Item>
          </TabNavigator>


    ):(<View></View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  tabbarIcon:{
    width:25,
    height:25
  }
});

AppRegistry.registerComponent('MoneyTurtle', () => MoneyTurtle);

/**
 * Created by hwh on 17/6/9.
 */
/**
 * Created by hwh on 17/6/9.
 */
import React, { Component } from 'react';
import {InputItem, Modal, Button, WingBlank, WhiteSpace, Toast } from 'antd-mobile';
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
const prompt = Modal.prompt;
export default class AboutUsPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      qq:1
    }
  }

  _renderContent(contents){
    return contents.map((item,index)=>{
      return(
          <Text key={item} key={item} style={{marginTop:3,fontSize:14,color:'rgb(51,51,51)'}}>
            {item}
          </Text>
      )
    })
  }

  async _fetchData(){
    try{
      let response = await fetch('http:47.94.133.192:7001/api/jinqiangui/qq')
      let responseJson = await response.json()
      if(responseJson.code === 0){
        this.setState({
          qq:responseJson.data
        })
      }
    }catch(e){
      Toast.fail('网络超时')
    }

  }

  async _changeQQ(qq){
    try{

      let response = await fetch('http:47.94.133.192:7001/api/jinqiangui/qq', {
        method: 'POST',
        body: JSON.stringify({
          qq:qq
        })
      })
      let responseJson = await response.json()
      if(responseJson.code === 0){
        Toast.success('修改成功')
      }
    }catch(e){
      Toast.fail('网络超时')
    }

  }

  componentDidMount(){
    this._fetchData()
  }

  _renderTableItem(itemData){
    return itemData.map((item,index)=>{
      return index === 0? (
          <View key={item} style={{width:(width - 30)/2,height:40,justifyContent:'center',alignItems:'center'}}><Text>{item}</Text></View>
      ) :(
          <View key={item} style={{width:(width - 30)/4,height:40,borderLeftWidth:1,justifyContent:'center',alignItems:'center'}}><Text>{item}</Text></View>
      )
    })
  }
  _renderTable(tableData){
    return tableData.map((item,index)=>{
      return index === 0 ? (
          <View key={item} style={{flexDirection:'row',borderWidth:1,marginTop:40}}>
            {this._renderTableItem(item)}
          </View>
      ) : (
          <View key={item} style={{flexDirection:'row',borderRightWidth:1,borderBottomWidth:1,borderLeftWidth:1}}>
            {this._renderTableItem(item)}
          </View>
      )
    })
  }
  render(){
    return(
        <View>
          <View style={{backgroundColor:'white',width:width,height:64,alignItems:'center',justifyContent:'center',borderColor:'#e8e8e8',borderBottomWidth:1}}>
            <Text style={{color:'rgba(16,142,233,1)',marginTop:15,fontSize:18}}>金钱龟</Text>
          </View>
          <View style={{width:width,height:height-44-64,backgroundColor:'rgba(245,245,249,1)',alignItems:'center'}}>
            <Image style={{width:95.5,height:95.5,marginTop:53}} source={require('../images/invalidName.png')}/>
            {this.state.qq && <Text style={{fontSize:14,marginTop:28.5}}>官方唯一授权联系QQ:<Text onPress={()=>{
                prompt('更改QQ', '请输入新QQ', [
                { text: '取消' },
                { text: '提交', onPress: value => this._changeQQ(value) },
                ], 'plain-text')
            }} style={{color:'rgb(208,2,27)',fontSize:14}}>{this.state.qq}</Text></Text>}
            {this._renderTable([['产品','时间','价格'],['直播视频通话演示及教程','5分钟','10元'],['激活授权码','30天','499元'],['激活授权码','180天','899元']])}
          </View>
        </View>

    )
  }
}
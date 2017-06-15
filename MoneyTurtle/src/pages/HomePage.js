/**
 * Created by hwh on 17/6/9.
 */
import React, { Component } from 'react';
import { InputItem, Toast , Button } from 'antd-mobile';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    AsyncStorage
} from 'react-native';
let window = Dimensions.get('window');
var width = window.width;
var height = window.height;
export default class HomePage extends Component {

  constructor(props){
    super(props)
    this.state = {
      MEID:'0',
      code:'',
      codeVerify:false
    }
  }
  _renderContent(contents){
    return contents.map((item,index)=>{
      return(
          <Text key={item} style={{marginTop:3,fontSize:14,color:'rgb(51,51,51)'}}>
            {item}
          </Text>
      )
    })
  }
  async componentDidMount(){
    var time = await AsyncStorage.getItem('MEID');

    if(!time){
      time = (new Date()).toString()
      await AsyncStorage.setItem('MEID',time.toString())
    }
    this.setState({
      MEID:time.substr(7)
    })
    console.log('meid',value)
  }
  //授权码算法
  setCode(text){
    //首位四个数字分别+25 +67 然后交换位置，中间两个数字颠倒位数
    var first = text.substr(0,2)
    var mid = text.substr(2,4)
    var last = text.substr(4)
    let new_first =  (parseInt(last) + 67).toString()
    let new_mid = mid[1]+mid[0]
    let new_last = (parseInt(last) + 25).toString()
    console.log('code',new_first[0] + new_first[1] + new_mid + new_last[0] + new_first[1])
    return new_first[0] + new_first[1] + new_mid + new_last[0] + new_first[1]
  }
  render(){
    return(
      <View style={{width:width,height:height-44,backgroundColor:'rgba(245,245,249,1)'}}>
        <View style={{backgroundColor:'white',width:width,height:64,alignItems:'center',justifyContent:'center',borderColor:'#e8e8e8',borderBottomWidth:1}}>
          <Text style={{color:'rgba(16,142,233,1)',marginTop:15,fontSize:18}}>金钱龟</Text>
        </View>
        <View style={{backgroundColor:'white',marginTop:17.5}}>
          <InputItem
              value={this.state.MEID}
              editable={false}
              >本机ID</InputItem>
          <InputItem
              type="default"
              placeholder="请输入授权码"
              value={this.state.code}
              editable={!this.state.codeVerify}
              onChange={(text)=>{
                this.setState({
                  code:text
                })
              }}
              >授权码</InputItem>
        </View>
        <View style={{marginLeft:15,marginRight:15}}>
          <Button style={{marginTop:19.5}} disabled={this.state.codeVerify} className="btn" type="primary" onClick={()=>{
             if(this.state.code){
             console.log('codeVerify',this.state.code,this.setCode(this.state.MEID))
               if(this.state.code === this.setCode(this.state.MEID)){
                Toast.success('授权成功')
                this.setState({
                  codeVerify:true
                })
               }
             }else{
                Toast.info('请输入授权码')
             }
          }}>{this.state.codeVerify?'授权成功':'授权激活'}</Button>
          <Button onClick={()=>{
             this.props.changeTabBar('aboutUs')
          }} className="btn" style={{marginTop:19.5,borderColor:'rgb(16,142,223)'}}>
            <Text style={{color:'rgb(16,142,223)'}}>购买激活码</Text>
          </Button>
          <Text style={{fontSize:17,marginTop:19.5}}>
            激活教程
          </Text>
          {this._renderContent(['1. 通过官方指定联系方式添加客服人员',
            '2. 复制本机 ID 发送给客服人员进行设备绑定',
            '3. 购买授权码并填入本页中点击授权激活按钮即可使用',
            '4. 授权码仅支持一机一码，如需更换手机请联系客服了解咨询'
          ])}
          <Text style={{fontSize:17,marginTop:19.5,color:'rgb(255,0,28)'}}>
            版权说明：
          </Text>
          {this._renderContent(['注：本公司软件及提供学习交流使用，禁止用于一切非法盈利目的，但凡用于盈利目的带来的后果自行承担，使用即代表同意此声明！',
              '最终解释权归于本公司所有。'
          ])}
        </View>


      </View>
    )
  }
}
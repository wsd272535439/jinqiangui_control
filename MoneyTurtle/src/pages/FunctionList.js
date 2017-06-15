/**
 * Created by hwh on 17/6/10.
 */

import React, { Component } from 'react';
import { InputItem, Toast , Button , List , Switch } from 'antd-mobile';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    ScrollView,
    Linking,
    Alert,
    DeviceEventEmitter,
    Keyboard
} from 'react-native';
let window = Dimensions.get('window');
var width = window.width;
var height = window.height;
export default class FunctionList extends Component {

  componentDidMount(){
    Keyboard.addListener('keyboardWillShow', (e)=>this.updateKeyboardSpace(e));
  }

  componentWillUnmount(){
    Keyboard.removeAllListeners()
  }

  updateKeyboardSpace(e){
    let scrollView = this.refs.scrollView
    scrollView.scrollTo({x:0,y:e.startCoordinates.screenY - 300 ,animated:true})
  }

  //resetKeyboardSpace(){
  //  let scrollView = this.refs.scrollView
  //  scrollView.scrollTo({x:0,y:e.startCoordinates.screenY - 300 ,animated:true})
  //
  //}

  constructor(props){
    super(props);
    this.state = {
      mainStart:false,
      preventSeal:false,
      preventError:false,
      controllMoney:false,
      grabMoney:false,
      fastGrad:false,
      gradeInfo:{

      },
      moneyInfo:{

      }
    }
  }

  _renderGrabMoney(){
    return this.state.grabMoney ? (
        <View>
          <View style={{marginTop:19,paddingLeft:26,paddingRight:26,backgroundColor:'white'}}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <View style={{flexDirection:'row',paddingTop:12.5,paddingBottom:12.5,alignItems:'center'}}>
                <Text style={{fontSize:17,marginRight:18}}>秒抢开关</Text>
                <Switch
                    onChange={(checked) => {
                    let gradeInfo = this.state.gradeInfo
                    gradeInfo.fastGrad = checked
                    this.setState({
                  gradeInfo:gradeInfo
                }) }}
                    checked={this.state.gradeInfo.fastGrad}
                    />
              </View>
              <View style={{flexDirection:'row',paddingTop:12.5,paddingBottom:12.5,alignItems:'center'}}>
                <Text style={{fontSize:17,marginRight:18}}>抢最大值</Text>
                <Switch
                    onChange={(checked) => {
                     let gradeInfo = this.state.gradeInfo
                    gradeInfo.gradeMax = checked
                    this.setState({
                  gradeInfo:gradeInfo
                }) }}
                    checked={this.state.gradeInfo.gradeMax}
                    />
              </View>
            </View>


            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <View style={{flexDirection:'row',paddingTop:12.5,paddingBottom:12.5,alignItems:'center'}}>
                <Text style={{fontSize:17,marginRight:18}}>抢最小值</Text>
                <Switch
                    onChange={(checked) => {
                    let gradeInfo = this.state.gradeInfo
                    gradeInfo.gradeMin = checked
                    this.setState({
                  gradeInfo:gradeInfo
                }) }}
                    checked={this.state.gradeInfo.gradeMin}
                    />
              </View>
              <View style={{flexDirection:'row',paddingTop:12.5,paddingBottom:12.5,alignItems:'center'}}>
                <Text style={{fontSize:17,marginRight:18}}>不抢尾包</Text>
                <Switch
                    onChange={(checked) => {
                    let gradeInfo = this.state.gradeInfo
                    gradeInfo.gradeMid = checked
                    this.setState({
                  gradeInfo:gradeInfo
                }) }}
                    checked={this.state.gradeInfo.gradeMid}
                    />
              </View>
            </View>

            <View style={{flexDirection:'row',paddingTop:12.5,paddingBottom:12.5,alignItems:'center'}}>
              <Text style={{fontSize:17,marginRight:18}}>自动识别避值模式</Text>
              <Switch
                  onChange={(checked) => {
                 let gradeInfo = this.state.gradeInfo
                    gradeInfo.autoAnl = checked
                    this.setState({
                  gradeInfo:gradeInfo
                }) }}
                  checked={this.state.gradeInfo.autoAnl}
                  />
            </View>

            <Text style={{color:'rgb(208,2,27)',fontSize:14}}>规则：自动检测红包留言框内数值，领取红包时会自动避开，需设置数值位置不可出现以下哪个位置</Text>

            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <View style={{flexDirection:'row',paddingTop:12.5,paddingBottom:12.5,alignItems:'center'}}>
                <Text style={{fontSize:17,marginRight:18}}>前一位</Text>
                <Switch
                    onChange={(checked) => {
                    let gradeInfo = this.state.gradeInfo
                    gradeInfo.beforeOne = checked
                    this.setState({
                  gradeInfo:gradeInfo
                }) }}
                    checked={this.state.gradeInfo.beforeOne}
                    />
              </View>
              <View style={{flexDirection:'row',paddingTop:12.5,paddingBottom:12.5,alignItems:'center'}}>
                <Text style={{fontSize:17,marginRight:18}}>末一位</Text>
                <Switch
                    onChange={(checked) => {
                    let gradeInfo = this.state.gradeInfo
                    gradeInfo.afterOne = checked
                    this.setState({
                  gradeInfo:gradeInfo
                }) }}
                    checked={this.state.gradeInfo.afterOne}
                    />
              </View>
            </View>

            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <View style={{flexDirection:'row',paddingTop:12.5,paddingBottom:12.5,alignItems:'center'}}>
                <Text style={{fontSize:17,marginRight:18}}>前两位</Text>
                <Switch
                    onChange={(checked) => {
                    let gradeInfo = this.state.gradeInfo
                    gradeInfo.beforeTwo = checked
                    this.setState({
                  gradeInfo:gradeInfo
                }) }}
                    checked={this.state.gradeInfo.beforeTwo}
                    />
              </View>
              <View style={{flexDirection:'row',paddingTop:12.5,paddingBottom:12.5,alignItems:'center'}}>
                <Text style={{fontSize:17,marginRight:18}}>末两位</Text>
                <Switch
                    onChange={(checked) => {
                    let gradeInfo = this.state.gradeInfo
                    gradeInfo.afterTwo = checked
                    this.setState({
                  gradeInfo:gradeInfo
                }) }}
                    checked={this.state.gradeInfo.afterTwo}
                    />
              </View>
            </View>
          </View>

          <View style={{marginLeft:26,marginRight:26}}>
            <Text style={{marginTop:10,marginBottom:6,fontSize:14,textAlign:'center'}}>
              注意：以上两种玩法只能同时启动一个
            </Text>
            <Text style={{color:'rgb(208,2,27)',fontSize:14,textAlign:'center'}}>设置完毕后点击按钮启动对应APP</Text>
          </View>

        </View>

    ):false
  }

  _renderControllMoney(){
    return this.state.controllMoney ? (
      <View>
        <Text style={{marginTop:6,marginBottom:6,marginLeft:15,marginRight:15,fontSize:14,color:'rgb(136,136,136)'}}>
          规则：5个包控制其中两个随机领取的金额，7个包控制其中三个随机领取的金额，11个以上包控制其中四个随机领取的金额相对于稳定。
        </Text>

        <View style={{backgroundColor:'white'}}>
          <InputItem
              ref='total'
              type="phone"
              placeholder="input money"
              onChange={(e)=>this._textChange(e,this.refs.total)}
              value={this.state.moneyInfo.total}
              data_sid='total'
              >总金额
          </InputItem>

          <InputItem
              ref='count'
              type="phone"
              placeholder="input count"
              onChange={(e)=>this._textChange(e,this.refs.count)}
              value={this.state.moneyInfo.count}
              data_sid='count'
              >包数
          </InputItem>
        </View>

        <Text style={{marginTop:6,marginBottom:6,marginLeft:15,marginRight:15,fontSize:14,color:'rgb(136,136,136)'}}>
          设置四个金额（<Text style={{color:'rgb(208,2,27)',fontSize:14}}>最多设置4个，金额随机</Text>）
        </Text>

        <View style={{backgroundColor:'white'}}>
          <InputItem
              ref='money1'
              type="phone"
              placeholder="输入领取金额"
              onChange={(e)=>this._textChange(e,this.refs.money1)}
              value={this.state.moneyInfo.money1}
              data_sid="money1"
              >金额一
          </InputItem>

          <InputItem
              ref='money2'
              type="phone"
              placeholder="输入领取金额"
              error={this.state.hasError}
              onErrorClick={this.onErrorClick}
              onChange={(e)=>this._textChange(e,this.refs.money2)}
              value={this.state.moneyInfo.money2}
              data_sid='money2'
              >金额二
          </InputItem>
          <InputItem
              ref='money3'
              type="phone"
              placeholder="输入领取金额"
              error={this.state.hasError}
              onErrorClick={this.onErrorClick}
              onChange={(e)=>this._textChange(e,this.refs.money3)}
              value={this.state.moneyInfo.money3}
              data_sid='money3'
              >金额三
          </InputItem>
          <InputItem
              type="money4"
              placeholder="输入领取金额"
              error={this.state.hasError}
              onErrorClick={this.onErrorClick}
              onChange={(e)=>this._textChange(e,this.refs.money4)}
              value={this.state.moneyInfo.money4}
              data_sid='money4'
              >金额四
          </InputItem>
        </View>
      </View>
    ) : false
  }

  _textChange(text,a){
    let moneyInfo = this.state.moneyInfo
    moneyInfo[a.props.data_sid] = text
    console.log('moneyInfo',moneyInfo)
    this.setState({
      moneyInfo:moneyInfo
    })
  }

  _openApp(shcema,noAppMsg){
    var alertStr = ""
    if(this.state.grabMoney){
      alertStr += "您已成功开启抢包设置。已成功启动相关程序："
      for (let gradeKey of Object.keys(this.state.gradeInfo)){
        switch (gradeKey){
          case 'fastGrad':
            if(this.state.gradeInfo[gradeKey]){
              alertStr += "秒抢、"
            }
            break;
          case 'gradeMax':
            if(this.state.gradeInfo[gradeKey]){
              alertStr += "抢最大值、"
            }
            break;
          case 'gradeMin':
            if(this.state.gradeInfo[gradeKey]){
              alertStr += "抢最小值、"
            }
            break;
          case 'gradeMid':
            if(this.state.gradeInfo[gradeKey]){
              alertStr += "不抢尾包、"
            }
            break;
          case 'autoAnl':
            if(this.state.gradeInfo[gradeKey]){
              alertStr += "自动识别避值模式、"
            }
            break;
          case 'beforeOne':
            if(this.state.gradeInfo[gradeKey]){
              alertStr += "前一位、"
            }
            break;
          case 'afterOne':
            if(this.state.gradeInfo[gradeKey]){
              alertStr += "末一位、"
            }
            break;
          case 'beforeTwo':
            if(this.state.gradeInfo[gradeKey]){
              alertStr += "前两位、"
            }
            break;
          case 'afterTwo':
            if(this.state.gradeInfo[gradeKey]){
              alertStr += "末两位、"
            }
            break;
        }
      }
    }else if(this.state.controllMoney){
      alertStr += "您已成功开启发包设置。已成功设置相关金额："
      var schema_query = shcema + "api?"
      for (let moneyKey of Object.keys(this.state.moneyInfo)){
        switch (moneyKey){
          case 'total':
            if(this.state.moneyInfo[moneyKey]){
              alertStr += "最大金额（"+this.state.moneyInfo[moneyKey]+")、"
              schema_query = schema_query + `totalMoney=${this.state.moneyInfo[moneyKey]}`

            }
            break;
          case 'count':
            if(this.state.moneyInfo[moneyKey]){
              alertStr += "红包数（"+this.state.moneyInfo[moneyKey]+")、"
              schema_query = schema_query + `&totalCount=${this.state.moneyInfo[moneyKey]}`
            }
            break;
          case 'money1':
            if(this.state.moneyInfo[moneyKey]){
              alertStr += "金额一（"+this.state.moneyInfo[moneyKey]+")、"
              schema_query = schema_query + `&money1=${this.state.moneyInfo[moneyKey]}`
            }
            break;
          case 'money2':
            if(this.state.moneyInfo[moneyKey]){
              alertStr += "金额二（"+this.state.moneyInfo[moneyKey]+")、"
              schema_query = schema_query + `&money2=${this.state.moneyInfo[moneyKey]}`

            }
            break;
          case 'money3':
            if(this.state.moneyInfo[moneyKey]){
              alertStr += "金额三（"+this.state.moneyInfo[moneyKey]+")、"
              schema_query = schema_query + `&money3=${this.state.moneyInfo[moneyKey]}`

            }
            break;
          case 'money4':
            if(this.state.gradeInfo[gradeKey]){
              alertStr += "金额四（"+this.state.moneyInfo[moneyKey]+")、"
              schema_query = schema_query + `&money4=${this.state.moneyInfo[moneyKey]}`
            }
            break;
        }
      }
    }

    if(alertStr[alertStr.length - 1] === "、"){
      alertStr = alertStr.substring(0,alertStr.length-1)
    }
    console.log('schema_query',schema_query)
    Alert.alert(
        "重要提示",
        alertStr,
            [
            {text: '关闭', onPress: () => console.log('Cancel Pressed!')},
            {text: '启动', onPress: () =>
                Linking.openURL(schema_query)
            }
            ]
    )
  }

  render(){
    return(
        <ScrollView ref='scrollView' style={{width:width,height:height-44,backgroundColor:'rgba(245,245,249,1)'}}>
          <View style={{backgroundColor:'white',width:width,height:64,alignItems:'center',justifyContent:'center',borderColor:'#e8e8e8',borderBottomWidth:1}}>
            <Text style={{color:'rgba(16,142,233,1)',marginTop:15,fontSize:18}}>金钱龟</Text>
          </View>
          <List style={{marginTop:22.5}}>
            <List.Item
                extra={<Switch
                onChange={(checked) => { this.setState({
                  mainStart:checked
                }) }}
                checked={this.state.mainStart}
            />}
                >启动开关
            </List.Item>
            <List.Item
                extra={<Switch
                onChange={(checked) => { this.setState({
                  preventSeal:checked
                }) }}
                checked={this.state.preventSeal}
            />}
                >防封开关
            </List.Item>
            <List.Item
                extra={<Switch
                onChange={(checked) => { this.setState({
                  preventError:checked
                }) }}
                checked={this.state.preventError}
            />}
                >防止异常
            </List.Item>
          </List>
          <List style={{marginTop:27}}>
            <List.Item
                extra={<Switch
                onChange={(checked) => {
                 if(this.state.grabMoney){
                  Toast.info('抢包设置和发红包金额控制只能选择一个')
                  return
                 }

                this.setState({
                  controllMoney:checked
                }) }}
                checked={this.state.controllMoney}
            />}
                >发红包金额控制
            </List.Item>
          </List>

          {this._renderControllMoney()}

          <List style={{marginTop:31.5}}>
            <List.Item
                extra={<Switch
                onChange={(checked) => {
                if(this.state.controllMoney){
                  Toast.info('抢包设置和发红包金额控制只能选择一个')
                  return
                 }
                this.setState({
                  grabMoney:checked
                }) }}
                checked={this.state.grabMoney}
            />}
                >抢包设置
            </List.Item>
          </List>

          {this._renderGrabMoney()}
          <View style={{flexDirection:'row',marginLeft:15,marginRight:15,justifyContent:'space-between'}}>
            <Button onClick={()=> this._openApp("jinqiangui://","您没有安装微信")}
            style={{marginTop:19.5,width:(width-30-47.5)/2,height:47}} className="btn" type="primary">启动微信</Button>
            <Button onClick={()=>this._openApp("mqq://","您没有安装QQ")} style={{marginTop:19.5,width:(width-30-47.5)/2,height:47}} className="btn" type="primary">启动QQ</Button>
          </View>
        </ScrollView>

    )
  }
}
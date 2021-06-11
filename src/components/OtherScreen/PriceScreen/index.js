'use strict';

import React, { Component } from 'react';
import _ from 'lodash'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import { View, FlatList, Picker, Text } from 'react-native';
import {
    Container, Content, Button, Icon, Left, Right, Form
} from 'native-base';
import {
    Headerd, styles, setNotify, dev_net, setNotEmpty, EmptyData, DotIndicator, RefreshScreen
} from '../../../helper'
import { PropsProduct } from './results'

export default class PriceScreen extends Component {
    state = {
        isProducts: [],
        isOperator: [],
        isTypes: [],
        isSetOperator: '',
        isSetType: '',
        isSetElm: false,
        isValSet: false,
        isRefresh: false
    }

    componentDidMount() {
        this._onRetrieveValStorage()
    }

    _onRetrieveValStorage = async () => {
        try {
            let val = await AsyncStorage.getItem('@keySign')
            let parse = JSON.parse(val)
            return _.isNull(parse) ? setNotfound(parse) :
            this.setState({
                agenid: _.get(parse[0], 'agenid'),
                price: _.get(parse[0], 'harga'),
                isRefresh: false
            }, () => this._onRetrieveValTypeAnProduct())
        } catch(e) {
            console.log(e);
        }
    }

    _onCheckingMarkupProduct = () => {
        if (_.isEmpty(this.state.price)) {
            this._onCheckingExistsMarkup()
        }else {
            this._onRetrieveValProductGroup()
        }
    }

    // select operator & type
    _onRetrieveValTypeAnProduct = async () => {
        try {
            const [operator, types] = await Promise.all([
                axios.get(dev_net()+`/product-users/operator/`),
                axios.get(dev_net()+`/product-users/types/`)
                ])

            if (_.isEqual(operator.data.status, 404)) {
                this.setState({
                    isValSet: false
                }, () => setNotify(operator.data.msg))
            }else {
                this.setState({
                    isOperator: operator.data.data,
                    isTypes: types.data.data
                })
            }
        } catch(e) {
            console.log(e);
        }
    }


    // status markup exists or does not exist
    _onCheckingExistsMarkup = async () => {
        try {
            let { agenid } = this.state;
            let urii = dev_net()+`/product-users-status/markup/${agenid}`
            let results = await axios.get(urii)
            console.log(results)
                if (_.isEqual(results.data.status, 404)) {
                    this._onRetrieveValProductOnly()
                }else {
                    this._onRetrieveValProductMarkup()
                }
        } catch(e) {
            console.log(e);
        }
    }

    // product markup does not exist
    _onRetrieveValProductOnly = async () => {
        try {
            let { isSetOperator, isSetType } = this.state;
            if (_.isEmpty(isSetOperator) || _.isEmpty(isSetType)) return setNotEmpty('operator & jenis')
                let urii = dev_net()+`product-users/only/${isSetOperator}/${isSetType}`
                let results = await axios.get(urii)
                    if (_.isEqual(results.data.status, 404)) {
                        console.log('prod')
                        this.setState({
                            isSetElm: false,
                            isValSet: false
                        }, () => setNotify(results.data.msg))
                    }else {
                        this.setState({
                            isProducts: results.data.data,
                            isSetElm: true,
                            isValSet: true,
                            isRefresh: false
                        })
                    }
        } catch(e) {
             setNotify(e)
            console.log(e);
        }
    }

    // products markup has exists
    _onRetrieveValProductMarkup = async () => {
        try {
            let { isSetOperator, isSetType, agenid } = this.state;
            if (_.isEmpty(isSetOperator) || _.isEmpty(isSetType)) return setNotEmpty('operator & jenis')
                let urii = dev_net()+`product-users/markup/${agenid}/${isSetOperator}/${isSetType}`
                let results = await axios.get(urii)
                    if (_.isEqual(results.data.status, 404)) {
                        // console.log('mar')setNotify(results.data.msg)
                        this.setState({
                            isSetElm: true,
                            isValSet: true
                        }, () => this._onRetrieveValProductOnly())
                    }else {
                        this.setState({
                            isProducts: results.data.data,
                            isSetElm: true,
                            isValSet: true,
                            isRefresh: false
                        })
                        // console.log('ma', results.data.data)
                    }
        } catch(e) {
            setNotify(e)
            console.log(e);
        }
    }

    // products groups has exists
    _onRetrieveValProductGroup = async () => {
        try {
            let { isSetOperator, isSetType, price } = this.state;
            if (_.isEmpty(isSetOperator) || _.isEmpty(isSetType)) return setNotEmpty('operator & jenis')
                let urii = dev_net()+`product-users/groups/${price}/${isSetOperator}/${isSetType}`
                let results = await axios.get(urii)
                    if (_.isEqual(results.data.status, 404)) {
                        this.setState({
                            isSetElm: false,
                            isValSet: false
                        }, () => setNotify(results.data.msg))
                    }else {
                        this.setState({
                            isProducts: results.data.data,
                            isSetElm: true,
                            isValSet: true,
                            isRefresh: false
                        })
                        // console.log('grp', results.data.data)
                    }
        } catch(e) {
            setNotify(e)
            console.log(e);
        }
    }

    _onRefreshNewValData = () => {
        this.setState({
            isProducts: [],
            isRefresh: true,
            isValSet: false,
            isSetElm: false,
            isSetOperator: '',
            isSetType: '',
        }, () => this._onRetrieveValStorage())
    }

  render() {
    return (
     <Container>
     <Headerd onPress={() => this.props.navigation.navigate('Dashboard')}>
            <Text>Cek Harga</Text>
         </Headerd>
          <RefreshScreen
                refreshing={this.state.isRefresh}
                onRefresh={this._onRefreshNewValData}
                style={styles.contentStyle}
              >
             <Content>
             <Form style={styles.formView}>
                 <View style={styles.itemWrap}>
                    <Left>
                        <Picker
                            selectedValue={this.state.isSetOperator}
                            onValueChange={val => this.setState({ isSetOperator: val })}
                            style={{ width: 150, height: 50, color:'red' }}
                        >
                            <Picker.Item  label={'Pilih Operator'} value={this.state.isSetOperator} />
                            {
                                _.map(this.state.isOperator, (i, j) => (
                                    <Picker.Item key={j} color='#595959' label={_.upperCase(i.operator)} value={i.operator} />
                                ))
                            }
                        </Picker>
                    </Left>
                    <Right>
                       <Picker
                            selectedValue={this.state.isSetType}
                            onValueChange={val => this.setState({ isSetType: val },
                                () => this._onCheckingMarkupProduct())}
                            style={{ width: 150, height: 50, color:'blue' }}
                        >
                            <Picker.Item  label={'Pilih Jenis'} value={this.state.isSetType} />
                            {
                                _.map(this.state.isTypes, (i, j) => (
                                    <Picker.Item key={j} color='#595959' label={_.upperCase(i.keterangan)} value={i.keterangan} />
                                ))
                            }
                        </Picker>
                    </Right>
                    {
                    this.state.isValSet ?
                        <Icon name='close-circle-outline' style={{ padding: 7, marginTop: 4, color: 'red'}}
                            onPress={this._onRefreshNewValData}
                        /> :
                        <Icon name='search' style={{ padding: 7, marginTop: 4, color: '#66a3ff'}}
                            onPress={this._onCheckingMarkupProduct}
                        />
                }

                 </View>
             </Form>
             {
                this.state.isSetElm ? <FlatList
                     data={this.state.isProducts}
                     keyExtractor={(i, j) => j.toString()}
                     renderItem={({item}) => <PropsProduct item={item} /> }
                     ListEmptyComponent={() => <DotIndicator color='blue' />}
                 /> : <EmptyData color='blue' />
             }

             </Content>
             </RefreshScreen>
     </Container>
    );
  }
}



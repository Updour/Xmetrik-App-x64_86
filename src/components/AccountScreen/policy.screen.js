'use strict';

import React, { Component } from 'react';

import { Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { Container } from 'native-base';
import { Headerd } from '../../helper'

export default class PolicyScreen extends Component {
    render() {
        let { goBack } = this.props.navigation
        return (
            <Container>
                <Headerd onPress={() => goBack(null)}>
                    <Text>Kebijakan & Privasi</Text>
                </Headerd>
                <WebView source={{uri: 'https://x-metrik.flycricket.io/privacy.html'}} />
            </Container>
            );
    }
}

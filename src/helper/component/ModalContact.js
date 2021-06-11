'use strict';

import React, { Component } from 'react';

import { ScrollView, RefreshControl, FlatList, StatusBar, Modal, Text, View, Alert, StyleSheet } from 'react-native';
import { Header, Left, Button, Icon, Body, Title } from 'native-base';

const ModalContact = ({
  visible, children, onRequestClose, onPress, data, renderItem,
  refreshing, onRefresh, style
}) => {
  return (
    <Modal
    animationType="slide"
    transparent={false}
    visible={visible}
    onRequestClose={onRequestClose}>
    <Header style={styles.header}>
    <Left>
    <Button transparent onPress={onPress}>
    <Icon name='ios-close' style={styles.icon} />
    </Button>
    </Left>
    <Body>
    <Title style={styles.title}>Select Contact</Title>
    </Body>
    <StatusBar
    backgroundColor="#0000cc"
    barStyle="light-content"
    />
    </Header>
    <ScrollView
    style={style}
    refreshControl={
      <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      colors={["red", "green", "blue", "yellow"]}
      />
    }>
    <FlatList
    data={data}
    keyExtractor={(x, y) => y.toString()}
    renderItem={renderItem}
    />
    </ScrollView>
    {children}

    </Modal>
    )
  }

  let styles = {
    header: {
      backgroundColor: '#f5f5f5'
    },
    icon: {
      color: '#000',
      fontSize: 30
    },
    title: {
      fontFamily: 'roboto',
      color: '#333333'
    }
  }
  export {ModalContact};

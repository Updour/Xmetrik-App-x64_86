
import React from 'react'

import { View } from 'react-native'
import { styles } from '../index'
const Snackbar = ({children, onPress}) => (
    <View style={styles.contentStyle}>
            <View style={styles.snackStyles}>
                {children}
            </View>
    </View>
    )

export { Snackbar }

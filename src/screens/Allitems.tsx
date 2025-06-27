import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Allitems = () => {
    return (
        <View style={styles.container}>
            <Text>Allitems</Text>
        </View>
    )
}

export default Allitems

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
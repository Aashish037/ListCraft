import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CreateScreen = () => {
    return (
        <View style={styles.container}>
            <Text>CreateScreen</Text>
        </View>
    )
}

export default CreateScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

})
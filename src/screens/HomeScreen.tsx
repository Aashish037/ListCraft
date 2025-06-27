import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import Allitems from './Allitems'
import CreateScreen from './CreateScreen'


const HomeScreen = () => {

    const [view, setView] = useState(0)

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashbooard</Text>
            <View style={styles.buttonContainer}>
                <Pressable
                    style={[
                        styles.button,
                        view === 0 ? styles.selectedButton : null
                    ]}
                    onPress={() => setView(0)}
                    >
                    <Text style={[styles.buttonText, view===0 ? styles.selectedText : null]}>All Items</Text>
                </Pressable>

                <Pressable
                    style={[
                        styles.button,
                        view === 1 ? styles.selectedButton : null
                    ]}
                    onPress={() => setView(1)}
                    >
                    <Text style={[styles.buttonText, view===1 ? styles.selectedText : null]}>Low Stock</Text>
                </Pressable>
                
                <Pressable
                    style={[
                        styles.button,
                        view === 2 ? styles.selectedButton : null
                    ]}
                    onPress={() => setView(2)}
                    >
                    <Text style={[styles.buttonText, view===2 ? styles.selectedText : null]}>Create</Text>
                </Pressable>
            </View>

            {view ===0 && <Allitems/>}
            {view ===1 && <Allitems/>}
            {view ===2 && <CreateScreen />}
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        padding: "4%",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
        marginVertical: 10,
    },
    button: {
        paddingVertical:3.5,
        paddingHorizontal: 10,
        borderRadius: 50,
        borderWidth: 0.8,
        borderColor: 'green',
    },
    selectedButton: {
        backgroundColor: 'green',
    },
    buttonText: {
        color: 'green',
        fontSize: 12,
    },
    selectedText: {
        color: '#fff',
        fontSize: 12,
    }
})
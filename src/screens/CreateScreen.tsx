import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'

type CreateScreenProps = {
    onAdd: (item: { name: string; quantity: number }) => void
}

const CreateScreen = ({ onAdd }: CreateScreenProps) => {
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('')

    const handleSubmit = () => {
        if (!name || !quantity) return
        onAdd({ name, quantity: parseInt(quantity, 10) })
        setName('')
        setQuantity('')
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Item Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                placeholder="Quantity"
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="number-pad"
                style={styles.input}
            />
            <Pressable style={styles.addButton} onPress={handleSubmit}>
                <Text style={styles.addText}>Add Item</Text>
            </Pressable>
        </View>
    )
}

export default CreateScreen

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
    input: {
        width: '90%',
        padding: 10,
        borderColor: 'green',
        borderWidth: 1,
        borderRadius: 6,
        marginBottom: 10,
    },
    addButton: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 6,
    },
    addText: {
        color: '#fff',
        fontWeight: 'bold',
    },
})

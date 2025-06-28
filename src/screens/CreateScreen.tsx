import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'

type CreateScreenProps = {
    onAdd: (item: { name: string; quantity: number; unit: string }) => Promise<void>
}

const CreateScreen = ({ onAdd }: CreateScreenProps) => {
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [unit, setUnit] = useState('') // Default unit

    const handleSubmit = async () => {
        if (!name || !quantity) return
        await onAdd({ name, quantity: parseInt(quantity, 10), unit })
        setName('')
        setQuantity('')
        setUnit('') // Reset unit after adding
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
            <TextInput
                placeholder="Unit (e.g. kg, dozen)"
                value={unit}
                onChangeText={setUnit}
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
        marginTop: 40,
    },
    input: {
        width: '90%',
        height: 50,
        padding: 12,
        borderColor: 'green',
        borderWidth: 1,
        borderRadius: 6,
        marginBottom: 15,
        fontSize: 16,
    },
    addButton: {
        backgroundColor: 'green',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 6,
    },
    addText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
})

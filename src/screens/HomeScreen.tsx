import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import Allitems from './Allitems'
import CreateScreen from './CreateScreen'

const HomeScreen = () => {
    const [view, setView] = useState(0)
    const [items, setItems] = useState([
        { id: 1, name: 'Item A', quantity: 5 },
        { id: 2, name: 'Item B', quantity: 2 },
        { id: 3, name: 'Item C', quantity: 10 },
    ])

    const addItem = (item: { name: string; quantity: number }) => {
        const newItem = { id: Date.now(), ...item }
        setItems(prev => [...prev, newItem])
    }

    const deleteItem = (id: number) => {
        setItems(prev => prev.filter(item => item.id !== id))
    }

    const editItem = (id: number, updated: { name: string; quantity: number }) => {
        setItems(prev => prev.map(item =>
            item.id === id ? { ...item, ...updated } : item
        ))
    }

    const filteredItems = view === 1
        ? items.filter(item => item.quantity <= 3)
        : items

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>

            <View style={styles.buttonContainer}>
                <TabButton title="All Items" isSelected={view === 0} onPress={() => setView(0)} />
                <TabButton title="Low Stock" isSelected={view === 1} onPress={() => setView(1)} />
                <TabButton title="Create" isSelected={view === 2} onPress={() => setView(2)} />
            </View>

            {view === 0 || view === 1 ? (
                <Allitems items={filteredItems} onDelete={deleteItem} onEdit={editItem} />
            ) : (
                <CreateScreen onAdd={addItem} />
            )}
        </View>
    )
}

type TabButtonProps = {
    title: string
    isSelected: boolean
    onPress: () => void
}

const TabButton = ({ title, isSelected, onPress }: TabButtonProps) => (
    <Pressable
        style={[styles.button, isSelected && styles.selectedButton]}
        onPress={onPress}
    >
        <Text style={[styles.buttonText, isSelected && styles.selectedText]}>{title}</Text>
    </Pressable>
)

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "5%",
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2e7d32',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 15,
    },
    button: {
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'green',
    },
    selectedButton: {
        backgroundColor: 'green',
    },
    buttonText: {
        color: 'green',
        fontSize: 14,
    },
    selectedText: {
        color: '#fff',
    },
})

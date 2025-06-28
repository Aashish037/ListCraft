import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import Allitems from './Allitems'
import CreateScreen from './CreateScreen'

const HomeScreen = () => {
    const [view, setView] = useState(0)
    const [items, setItems] = useState([
    { id: 1, name: 'Item A', quantity: 5, unit: 'kg' },
    { id: 2, name: 'Item B', quantity: 2, unit: 'dozen' },
    { id: 3, name: 'Item C', quantity: 10, unit: 'pcs' },
])

    const addItem = (item: { name: string; quantity: number; unit: string }) => {
    const newItem = { id: Date.now(), ...item }
    setItems(prev => [...prev, newItem])
}

    const deleteItem = (id: number) => {
        setItems(prev => prev.filter(item => item.id !== id))
    }

    const editItem = (id: number, updated: { name: string; quantity: number; unit: string }) => {
    setItems(prev => prev.map(item =>
        item.id === id ? { ...item, ...updated } : item))
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
    paddingTop: 50, // ensures space from top
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'green',
  },
  selectedButton: {
    backgroundColor: 'green',
  },
  buttonText: {
    color: 'green',
    fontSize: 16,
  },
  selectedText: {
    color: '#fff',
  },
})
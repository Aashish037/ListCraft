import { StyleSheet, Text, View, Pressable, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import Allitems from './Allitems'
import CreateScreen from './CreateScreen'
import { ItemServiceDirect } from '../services/ItemServiceDirect'
import { Item, ItemInsert, ItemUpdate } from '../lib/supabase'

const HomeScreen = () => {
    const [view, setView] = useState(0)
    const [items, setItems] = useState<Item[]>([])
    const [loading, setLoading] = useState(false)

    // Load items when component mounts
    useEffect(() => {
        loadItems()
    }, [])

    const loadItems = async () => {
        try {
            console.log('🔄 Starting to load items...');
            setLoading(true)
            const data = await ItemServiceDirect.getAllItems()
            console.log('✅ Items loaded successfully:', data?.length || 0, 'items');
            setItems(data)
        } catch (error) {
            console.error('❌ Error loading items:', error);
            const errorMessage = error instanceof Error ? error.message : String(error);
            Alert.alert('Error', `Failed to load items: ${errorMessage}`)
        } finally {
            setLoading(false)
        }
    }

    const addItem = async (item: ItemInsert) => {
        try {
            setLoading(true)
            const newItem = await ItemServiceDirect.addItem(item)
            setItems(prev => [...prev, newItem])
        } catch (error) {
            Alert.alert('Error', 'Failed to add item')
            console.error('Error adding item:', error)
        } finally {
            setLoading(false)
        }
    }

    const deleteItem = async (id: number) => {
        try {
            setLoading(true)
            await ItemServiceDirect.deleteItem(id)
            setItems(prev => prev.filter(item => item.id !== id))
        } catch (error) {
            Alert.alert('Error', 'Failed to delete item')
            console.error('Error deleting item:', error)
        } finally {
            setLoading(false)
        }
    }

    const editItem = async (id: number, updated: ItemUpdate) => {
        try {
            setLoading(true)
            const updatedItem = await ItemServiceDirect.updateItem(id, updated)
            setItems(prev => prev.map(item =>
                item.id === id ? updatedItem : item
            ))
        } catch (error) {
            Alert.alert('Error', 'Failed to update item')
            console.error('Error updating item:', error)
        } finally {
            setLoading(false)
        }
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

            {loading && <Text style={styles.loadingText}>Loading...</Text>}

            {view === 0 || view === 1 ? (
                <Allitems 
                    items={filteredItems} 
                    onDelete={deleteItem} 
                    onEdit={editItem}
                />
            ) : (
                <CreateScreen 
                    onAdd={addItem} 
                />
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
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginVertical: 10,
  },
})
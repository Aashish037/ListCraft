import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Pressable,
    Modal,
    TextInput,
} from 'react-native'
import React, { useState } from 'react'

// ✅ Type Definitions
type Item = {
    id: number
    name: string
    quantity: number
    unit: string
}

type AllitemsProps = {
    items: Item[]
    onDelete: (id: number) => Promise<void>
    onEdit: (id: number, updated: { name: string; quantity: number; unit: string }) => Promise<void>
}

const Allitems: React.FC<AllitemsProps> = ({ items, onDelete, onEdit }) => {
    const [editModalVisible, setEditModalVisible] = useState(false)
    const [currentItem, setCurrentItem] = useState<Item | null>(null)
    const [editedName, setEditedName] = useState('')
    const [editedQty, setEditedQty] = useState('')
    const [editedUnit, setEditedUnit] = useState('')

    const openEditModal = (item: Item) => {
        setCurrentItem(item)
        setEditedName(item.name)
        setEditedQty(String(item.quantity))
        setEditedUnit(item.unit || '')
        setEditModalVisible(true)
    }

   const handleEdit = async () => {
    if (currentItem && editedName && editedQty) {
        await onEdit(currentItem.id, {
            name: editedName,
            quantity: parseInt(editedQty, 10),
            unit: editedUnit,
        })
        setEditModalVisible(false)
    }
}

    return (
        <View style={styles.container}>
            {items.length === 0 ? (
                <Text style={styles.emptyText}>No items found.</Text>
            ) : (
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text style={styles.itemText}>
                                {item.name} - {item.quantity} {item.unit || ''}
                            </Text>
                            <View style={styles.actions}>
                                <Pressable
                                    style={styles.editBtn}
                                    onPress={() => openEditModal(item)}
                                >
                                    <Text style={styles.editText}>Edit</Text>
                                </Pressable>
                                <Pressable
                                    style={styles.deleteBtn}
                                    onPress={() => onDelete(item.id)}
                                >
                                    <Text style={styles.deleteText}>Delete</Text>
                                </Pressable>
                            </View>
                        </View>
                    )}
                />
            )}

            {/* 🔧 Edit Modal */}
            <Modal visible={editModalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit Item</Text>
                        <TextInput
                            value={editedName}
                            onChangeText={setEditedName}
                            style={styles.input}
                            placeholder="Name"
                        />
                        <TextInput
                            value={editedQty}
                            onChangeText={setEditedQty}
                            keyboardType="number-pad"
                            style={styles.input}
                            placeholder="Quantity"
                        />
                        <TextInput
                            value={editedUnit}
                            onChangeText={setEditedUnit}
                            style={styles.input}
                            placeholder="Unit (e.g. kg, dozen)"
                        />
                        <View style={styles.modalButtons}>
                            <Pressable style={styles.modalBtn} onPress={handleEdit}>
                                <Text style={styles.saveText}>Save</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.modalBtn, styles.cancelButton]}
                                onPress={() => setEditModalVisible(false)}
                                >
                                <Text style={styles.cancelText}>Cancel</Text>
                            </Pressable>

                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default Allitems

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
    },
    item: {
        backgroundColor: '#e8f5e9',
        padding: 12,
        marginBottom: 8,
        borderRadius: 6,
    },
    itemText: {
        fontSize: 16,
        color: '#2e7d32',
        marginBottom: 6,
    },
    actions: {
        flexDirection: 'row',
        gap: 10,
    },
    deleteBtn: {
        backgroundColor: '#c62828',
        padding: 6,
        borderRadius: 4,
    },
    deleteText: {
        color: '#fff',
        fontSize: 12,
    },
    editBtn: {
        backgroundColor: '#2e7d32',
        padding: 6,
        borderRadius: 4,
    },
    editText: {
        color: '#fff',
        fontSize: 12,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#888',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#2e7d32',
    },
    input: {
        borderWidth: 1,
        borderColor: '#2e7d32',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalBtn: {
        backgroundColor: '#2e7d32',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
    },
    saveText: {
        color: '#fff',
    },
    cancelButton: {
        backgroundColor: '#ccc',
    },
    cancelText: {
        color: '#333',
    },


})
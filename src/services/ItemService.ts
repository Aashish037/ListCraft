import { supabase, Item, ItemInsert, ItemUpdate } from '../lib/supabase'

export class ItemService {
  // Fetch all items
  static async getAllItems(): Promise<Item[]> {
    try {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .order('id', { ascending: true })

      if (error) {
        throw new Error(`Error fetching items: ${error.message}`)
      }

      return data || []
    } catch (error) {
      console.error('Failed to fetch items:', error)
      throw error
    }
  }

  // Add a new item
  static async addItem(item: ItemInsert): Promise<Item> {
    try {
      const { data, error } = await supabase
        .from('items')
        .insert([item])
        .select()
        .single()

      if (error) {
        throw new Error(`Error adding item: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error('Failed to add item:', error)
      throw error
    }
  }

  // Update an existing item
  static async updateItem(id: number, updates: ItemUpdate): Promise<Item> {
    try {
      const { data, error } = await supabase
        .from('items')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        throw new Error(`Error updating item: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error('Failed to update item:', error)
      throw error
    }
  }

  // Delete an item
  static async deleteItem(id: number): Promise<void> {
    try {
      const { error } = await supabase
        .from('items')
        .delete()
        .eq('id', id)

      if (error) {
        throw new Error(`Error deleting item: ${error.message}`)
      }
    } catch (error) {
      console.error('Failed to delete item:', error)
      throw error
    }
  }

  // Get items with low stock (quantity <= 3)
  static async getLowStockItems(): Promise<Item[]> {
    try {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .lte('quantity', 3)
        .order('quantity', { ascending: true })

      if (error) {
        throw new Error(`Error fetching low stock items: ${error.message}`)
      }

      return data || []
    } catch (error) {
      console.error('Failed to fetch low stock items:', error)
      throw error
    }
  }
}

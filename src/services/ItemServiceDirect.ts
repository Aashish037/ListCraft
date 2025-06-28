// Alternative Supabase service using fetch instead of the client
import { config } from '../config/supabase-config'
import { Item, ItemInsert, ItemUpdate } from '../lib/supabase'

const SUPABASE_URL = config.SUPABASE_URL
const SUPABASE_ANON_KEY = config.SUPABASE_ANON_KEY
const API_URL = `${SUPABASE_URL}/rest/v1`

const headers = {
  'apikey': SUPABASE_ANON_KEY,
  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation'
}

export class ItemServiceDirect {
  // Fetch all items
  static async getAllItems(): Promise<Item[]> {
    try {
      const response = await fetch(`${API_URL}/items?select=*&order=id.asc`, {
        method: 'GET',
        headers
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data || []
    } catch (error) {
      console.error('Failed to fetch items:', error)
      throw error
    }
  }

  // Add a new item
  static async addItem(item: ItemInsert): Promise<Item> {
    try {
      const response = await fetch(`${API_URL}/items`, {
        method: 'POST',
        headers,
        body: JSON.stringify(item)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data[0]
    } catch (error) {
      console.error('Failed to add item:', error)
      throw error
    }
  }

  // Update an existing item
  static async updateItem(id: number, updates: ItemUpdate): Promise<Item> {
    try {
      const response = await fetch(`${API_URL}/items?id=eq.${id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(updates)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data[0]
    } catch (error) {
      console.error('Failed to update item:', error)
      throw error
    }
  }

  // Delete an item
  static async deleteItem(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/items?id=eq.${id}`, {
        method: 'DELETE',
        headers
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    } catch (error) {
      console.error('Failed to delete item:', error)
      throw error
    }
  }
}

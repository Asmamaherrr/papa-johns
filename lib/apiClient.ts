// API client utilities for frontend components

export class ApiClient {
  private baseUrl = "/api"

  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    const response = await fetch(url, config)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "API request failed")
    }

    return data
  }

  // Orders
  async getOrders(params?: { status?: string; customerId?: string }) {
    const searchParams = new URLSearchParams()
    if (params?.status) searchParams.set("status", params.status)
    if (params?.customerId) searchParams.set("customerId", params.customerId)

    return this.request(`/orders?${searchParams.toString()}`)
  }

  async createOrder(orderData: any) {
    return this.request("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    })
  }

  async updateOrderStatus(orderId: string, status: string) {
    return this.request(`/orders/${orderId}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    })
  }

  async getOrder(orderId: string) {
    return this.request(`/orders/${orderId}`)
  }

  // Menu
  async getMenuItems(params?: { category?: string; available?: boolean; search?: string }) {
    const searchParams = new URLSearchParams()
    if (params?.category) searchParams.set("category", params.category)
    if (params?.available !== undefined) searchParams.set("available", params.available.toString())
    if (params?.search) searchParams.set("search", params.search)

    return this.request(`/menu?${searchParams.toString()}`)
  }

  async createMenuItem(itemData: any) {
    return this.request("/menu", {
      method: "POST",
      body: JSON.stringify(itemData),
    })
  }

  async updateMenuItem(itemId: number, itemData: any) {
    return this.request(`/menu/${itemId}`, {
      method: "PATCH",
      body: JSON.stringify(itemData),
    })
  }

  async deleteMenuItem(itemId: number) {
    return this.request(`/menu/${itemId}`, {
      method: "DELETE",
    })
  }

  // Analytics
  async getAnalytics(period = "today") {
    return this.request(`/analytics?period=${period}`)
  }

  // Users
  async getUsers(params?: { search?: string; status?: string }) {
    const searchParams = new URLSearchParams()
    if (params?.search) searchParams.set("search", params.search)
    if (params?.status) searchParams.set("status", params.status)

    return this.request(`/users?${searchParams.toString()}`)
  }

  async createUser(userData: any) {
    return this.request("/users", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  }

  // Notifications
  async sendNotification(notificationData: any) {
    return this.request("/notifications", {
      method: "POST",
      body: JSON.stringify(notificationData),
    })
  }
}

export const apiClient = new ApiClient()

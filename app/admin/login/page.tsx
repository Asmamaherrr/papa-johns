"use server"

import { apiClient } from "@/lib/apiClient"

export async function createOrder(formData: FormData) {
  try {
    const orderData = {
      customer: {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        phone: formData.get("phone"),
      },
      address: {
        street: formData.get("address"),
        city: formData.get("city"),
        zipCode: formData.get("zipCode"),
      },
      items: JSON.parse(formData.get("items") as string),
      total: Number.parseFloat(formData.get("total") as string),
      type: formData.get("orderType"),
      paymentMethod: formData.get("paymentMethod"),
      deliveryInstructions: formData.get("instructions"),
    }

    const result = await apiClient.createOrder(orderData)

    // Send order confirmation notification
    await apiClient.sendNotification({
      type: "email",
      recipient: orderData.customer.email,
      orderId: result.order.id,
      message: `Your order ${result.order.id} has been confirmed and is being prepared.`,
    })

    return { success: true, order: result.order }
  } catch (error) {
    console.error("Failed to create order:", error)
    return { success: false, error: "Failed to create order" }
  }
}

export async function updateOrderStatus(orderId: string, status: string) {
  try {
    const result = await apiClient.updateOrderStatus(orderId, status)

    // Send status update notification
    const order = await apiClient.getOrder(orderId)
    if (order.success) {
      await apiClient.sendNotification({
        type: "sms",
        recipient: order.order.customer.phone,
        orderId,
        message: `Your order ${orderId} is now ${status}.`,
      })
    }

    return { success: true, order: result.order }
  } catch (error) {
    console.error("Failed to update order status:", error)
    return { success: false, error: "Failed to update order status" }
  }
}

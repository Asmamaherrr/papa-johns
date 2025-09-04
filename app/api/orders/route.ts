import { type NextRequest, NextResponse } from "next/server"

// Mock database - in a real app, this would be a proper database
const orders: any[] = [
  {
    id: "ORD-001",
    customer: {
      firstName: "John",
      lastName: "Smith",
      email: "john@example.com",
      phone: "(555) 123-4567",
    },
    address: {
      street: "123 Main St",
      city: "Anytown",
      zipCode: "12345",
    },
    items: [
      { id: 1, name: "The Works", quantity: 1, price: 16.99 },
      { id: 2, name: "Pepperoni", quantity: 1, price: 12.99 },
    ],
    total: 32.97,
    status: "preparing",
    type: "delivery",
    orderTime: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 45 * 60000).toISOString(),
    paymentMethod: "card",
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const customerId = searchParams.get("customerId")

  let filteredOrders = orders

  if (status && status !== "all") {
    filteredOrders = orders.filter((order) => order.status === status)
  }

  if (customerId) {
    filteredOrders = orders.filter((order) => order.customer.id === customerId)
  }

  return NextResponse.json({
    success: true,
    orders: filteredOrders,
    total: filteredOrders.length,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customer, address, items, total, type, paymentMethod, deliveryInstructions } = body

    // Generate order ID
    const orderId = `ORD-${String(orders.length + 1).padStart(3, "0")}`

    // Create new order
    const newOrder = {
      id: orderId,
      customer,
      address: type === "delivery" ? address : null,
      items,
      total,
      status: "preparing",
      type,
      orderTime: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + (type === "delivery" ? 45 : 25) * 60000).toISOString(),
      paymentMethod,
      deliveryInstructions: deliveryInstructions || null,
    }

    orders.push(newOrder)

    // Simulate order confirmation email/SMS
    console.log(`Order ${orderId} created for ${customer.firstName} ${customer.lastName}`)

    return NextResponse.json({
      success: true,
      order: newOrder,
      message: "Order placed successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create order",
      },
      { status: 500 },
    )
  }
}

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

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const order = orders.find((o) => o.id === params.id)

  if (!order) {
    return NextResponse.json(
      {
        success: false,
        error: "Order not found",
      },
      { status: 404 },
    )
  }

  return NextResponse.json({
    success: true,
    order,
  })
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { status } = body

    const orderIndex = orders.findIndex((o) => o.id === params.id)

    if (orderIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: "Order not found",
        },
        { status: 404 },
      )
    }

    // Update order status
    orders[orderIndex] = {
      ...orders[orderIndex],
      status,
      updatedAt: new Date().toISOString(),
    }

    // Simulate status update notification
    console.log(`Order ${params.id} status updated to ${status}`)

    return NextResponse.json({
      success: true,
      order: orders[orderIndex],
      message: "Order status updated successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update order",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const orderIndex = orders.findIndex((o) => o.id === params.id)

  if (orderIndex === -1) {
    return NextResponse.json(
      {
        success: false,
        error: "Order not found",
      },
      { status: 404 },
    )
  }

  // Remove order (or mark as cancelled)
  orders[orderIndex] = {
    ...orders[orderIndex],
    status: "cancelled",
    cancelledAt: new Date().toISOString(),
  }

  return NextResponse.json({
    success: true,
    message: "Order cancelled successfully",
  })
}

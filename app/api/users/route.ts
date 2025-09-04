import { type NextRequest, NextResponse } from "next/server"

// Mock users database
const users: any[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Smith",
    email: "john@example.com",
    phone: "(555) 123-4567",
    addresses: [
      {
        id: "1",
        street: "123 Main St",
        city: "Anytown",
        zipCode: "12345",
        isDefault: true,
      },
    ],
    orderHistory: ["ORD-001", "ORD-005"],
    totalOrders: 12,
    totalSpent: 342.88,
    joinDate: "2023-06-15",
    lastOrder: "2024-01-15",
    status: "active",
  },
  {
    id: "2",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah@example.com",
    phone: "(555) 987-6543",
    addresses: [
      {
        id: "2",
        street: "456 Oak Ave",
        city: "Anytown",
        zipCode: "12345",
        isDefault: true,
      },
    ],
    orderHistory: ["ORD-002"],
    totalOrders: 8,
    totalSpent: 234.56,
    joinDate: "2023-08-22",
    lastOrder: "2024-01-15",
    status: "active",
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get("search")
  const status = searchParams.get("status")

  let filteredUsers = users

  if (search) {
    filteredUsers = users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(search.toLowerCase()) ||
        user.lastName.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()),
    )
  }

  if (status && status !== "all") {
    filteredUsers = filteredUsers.filter((user) => user.status === status)
  }

  return NextResponse.json({
    success: true,
    users: filteredUsers,
    total: filteredUsers.length,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone } = body

    // Check if user already exists
    const existingUser = users.find((user) => user.email === email)
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: "User with this email already exists",
        },
        { status: 400 },
      )
    }

    // Generate new user ID
    const newId = String(Math.max(...users.map((user) => Number.parseInt(user.id))) + 1)

    const newUser = {
      id: newId,
      firstName,
      lastName,
      email,
      phone: phone || null,
      addresses: [],
      orderHistory: [],
      totalOrders: 0,
      totalSpent: 0,
      joinDate: new Date().toISOString().split("T")[0],
      lastOrder: null,
      status: "active",
    }

    users.push(newUser)

    return NextResponse.json({
      success: true,
      user: newUser,
      message: "User created successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create user",
      },
      { status: 500 },
    )
  }
}
